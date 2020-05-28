<template>
  <div class="searchbox ins-search" :class="{ 'is-show': show }">
    <div class="searchbox-mask"></div>
    <div class="searchbox-container ins-search-container">
      <div class="searchbox-input-wrapper">
        <input
          type="text"
          class="searchbox-input ins-search-input"
          placeholder="Type something..."
          @focus="focused = true"
          @blur="focused = false"
          @input="query = $event.target.value"
        />
        <span class="searchbox-close ins-close ins-selectable" @click="closeSearchBox">
          <font-awesome-icon :icon="['fa', 'times-circle']" />
        </span>
      </div>
      <div class="searchbox-result-wrapper ins-section-wrapper">
        <div class="ins-section-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      JSON: {
        posts: [],
        pages: [],
        tags: [],
        categories: []
      },
      query: "",
      focused: false,
      INSIGHT_CONFIG: {
        TRANSLATION: {
          POSTS: "文章",
          PAGES: "頁面",
          CATEGORIES: "分類",
          TAGS: "標籤",
          UNTITLED: "(無標題)"
        },
        CONTENT_URL: ""
      }
    };
  },
  watch: {
    show() {
      this.checkME();
    }
  },
  methods: {
    setupData() {
      const vm = this;
      const posts = this.$site.pages.filter(item => item.id);
      const pages = this.$site.pages.filter(item => !item.id && item.title);
      const tags = this.$tag._metaMap;
      const categories = this.$category._metaMap;

      function resolvePostsDate(posts) {
        const data = posts.map(item => {
          let obj = {};
          obj.title = item.title;
          obj.text = item.content;
          obj.link = item.path;
          return obj;
        });
        return data;
      }

      function resolveTaxonomiesDate(term) {
        const data = Object.keys(term).map(item => {
          let obj = {};
          obj.name = term[item]["key"];
          obj.slug = term[item]["key"];
          obj.link = term[item]["path"];
          return obj;
        });
        return data;
      }

      vm.JSON.posts = resolvePostsDate(posts);
      vm.JSON.pages = resolvePostsDate(pages);
      vm.JSON.tags = resolveTaxonomiesDate(tags);
      vm.JSON.categories = resolveTaxonomiesDate(categories);
    },
    closeSearchBox() {
      this.$emit("SearchBoxOff");
    },
    onHotkey(event) {
      if (event.code === "Escape") {
        this.closeSearchBox();
      }
    },
    checkME() {
      const vm = this;
      let CONFIG = {
        TRANSLATION: {
          POSTS: "文章",
          PAGES: "頁面",
          CATEGORIES: "分類",
          TAGS: "標籤",
          UNTITLED: "(無標題)"
        },
        CONTENT_URL: "/assets/content.json"
      };
      var $main = $(".ins-search");
      var $input = $main.find(".ins-search-input");
      var $wrapper = $main.find(".ins-section-wrapper");
      var $container = $main.find(".ins-section-container");
      $main.parent().remove(".ins-search");
      $("body").append($main);

      function section(title) {
        return $("<section>")
          .addClass("ins-section")
          .append(
            $("<header>")
              .addClass("ins-section-header")
              .text(title)
          );
      }

      function searchItem(icon, title, slug, preview, url) {
        return $("<div>")
          .addClass("ins-selectable")
          .addClass("ins-search-item")
          .append(
            $("<header>")
              .append(
                $("<i>")
                  .addClass("fa")
                  .addClass("fa-" + icon)
              )
              .append(
                $("<span>")
                  .addClass("ins-title")
                  .text(
                    title != null && title !== ""
                      ? title
                      : CONFIG.TRANSLATION["UNTITLED"]
                  )
              )
              .append(
                slug
                  ? $("<span>")
                      .addClass("ins-slug")
                      .text(slug)
                  : null
              )
          )
          .append(
            preview
              ? $("<p>")
                  .addClass("ins-search-preview")
                  .text(preview)
              : null
          )
          .attr("data-url", url);
      }

      function sectionFactory(type, array) {
        var sectionTitle;
        var $searchItems;
        if (array.length === 0) return null;
        sectionTitle = CONFIG.TRANSLATION[type];
        switch (type) {
          case "POSTS":
          case "PAGES":
            $searchItems = array.map(function(item) {
              // Use config.root instead of permalink to fix url issue
              return searchItem(
                "file",
                item.title,
                null,
                item.text.slice(0, 150),
                item.link
              );
            });
            break;
          case "CATEGORIES":
          case "TAGS":
            $searchItems = array.map(function(item) {
              return searchItem(
                type === "CATEGORIES" ? "folder" : "tag",
                item.name,
                item.slug,
                null,
                item.link
              );
            });
            break;
          default:
            return null;
        }
        return section(sectionTitle).append($searchItems);
      }

      function parseKeywords(keywords) {
        return keywords
          .split(" ")
          .filter(function(keyword) {
            return !!keyword;
          })
          .map(function(keyword) {
            return keyword.toUpperCase();
          });
      }

      /**
       * Judge if a given post/page/category/tag contains all of the keywords.
       * @param Object            obj     Object to be weighted
       * @param Array<String>     fields  Object's fields to find matches
       */
      function filter(keywords, obj, fields) {
        var keywordArray = parseKeywords(keywords);
        var containKeywords = keywordArray.filter(function(keyword) {
          var containFields = fields.filter(function(field) {
            if (!obj.hasOwnProperty(field)) return false;
            if (obj[field].toUpperCase().indexOf(keyword) > -1) return true;
          });
          if (containFields.length > 0) return true;
          return false;
        });
        return containKeywords.length === keywordArray.length;
      }

      function filterFactory(keywords) {
        return {
          POST: function(obj) {
            return filter(keywords, obj, ["title", "text"]);
          },
          PAGE: function(obj) {
            return filter(keywords, obj, ["title", "text"]);
          },
          CATEGORY: function(obj) {
            return filter(keywords, obj, ["name", "slug"]);
          },
          TAG: function(obj) {
            return filter(keywords, obj, ["name", "slug"]);
          }
        };
      }

      /**
       * Calculate the weight of a matched post/page/category/tag.
       * @param Object            obj     Object to be weighted
       * @param Array<String>     fields  Object's fields to find matches
       * @param Array<Integer>    weights Weight of every field
       */
      function weight(keywords, obj, fields, weights) {
        var value = 0;
        parseKeywords(keywords).forEach(function(keyword) {
          var pattern = new RegExp(keyword, "img"); // Global, Multi-line, Case-insensitive
          fields.forEach(function(field, index) {
            if (obj.hasOwnProperty(field)) {
              var matches = obj[field].match(pattern);
              value += matches ? matches.length * weights[index] : 0;
            }
          });
        });
        return value;
      }

      function weightFactory(keywords) {
        return {
          POST: function(obj) {
            return weight(keywords, obj, ["title", "text"], [3, 1]);
          },
          PAGE: function(obj) {
            return weight(keywords, obj, ["title", "text"], [3, 1]);
          },
          CATEGORY: function(obj) {
            return weight(keywords, obj, ["name", "slug"], [1, 1]);
          },
          TAG: function(obj) {
            return weight(keywords, obj, ["name", "slug"], [1, 1]);
          }
        };
      }

      function search(json, keywords) {
        var WEIGHTS = weightFactory(keywords);
        var FILTERS = filterFactory(keywords);
        var posts = json.posts;
        var pages = json.pages;
        var tags = json.tags;
        var categories = json.categories;
        return {
          posts: posts
            .filter(FILTERS.POST)
            .sort(function(a, b) {
              return WEIGHTS.POST(b) - WEIGHTS.POST(a);
            })
            .slice(0, 5),
          pages: pages
            .filter(FILTERS.PAGE)
            .sort(function(a, b) {
              return WEIGHTS.PAGE(b) - WEIGHTS.PAGE(a);
            })
            .slice(0, 5),
          categories: categories
            .filter(FILTERS.CATEGORY)
            .sort(function(a, b) {
              return WEIGHTS.CATEGORY(b) - WEIGHTS.CATEGORY(a);
            })
            .slice(0, 5),
          tags: tags
            .filter(FILTERS.TAG)
            .sort(function(a, b) {
              return WEIGHTS.TAG(b) - WEIGHTS.TAG(a);
            })
            .slice(0, 5)
        };
      }

      function searchResultToDOM(searchResult) {
        $container.empty();
        for (var key in searchResult) {
          $container.append(
            sectionFactory(key.toUpperCase(), searchResult[key])
          );
        }
      }

      function scrollTo($item) {
        if ($item.length === 0) return;
        var wrapperHeight = $wrapper[0].clientHeight;
        var itemTop = $item.position().top - $wrapper.scrollTop();
        var itemBottom = $item[0].clientHeight + $item.position().top;
        if (itemBottom > wrapperHeight + $wrapper.scrollTop()) {
          $wrapper.scrollTop(itemBottom - $wrapper[0].clientHeight);
        }
        if (itemTop < 0) {
          $wrapper.scrollTop($item.position().top);
        }
      }

      function selectItemByDiff(value) {
        var $items = $.makeArray($container.find(".ins-selectable"));
        var prevPosition = -1;
        $items.forEach(function(item, index) {
          if ($(item).hasClass("active")) {
            prevPosition = index;
            return;
          }
        });
        var nextPosition =
          ($items.length + prevPosition + value) % $items.length;
        $($items[prevPosition]).removeClass("active");
        $($items[nextPosition]).addClass("active");
        scrollTo($($items[nextPosition]));
      }

      function gotoLink($item) {
        if ($item && $item.length) {
          location.href = $item.attr("data-url");
        }
      }

      // $.getJSON(CONFIG.CONTENT_URL, function(json) {
      //   if (location.hash.trim() === "#ins-search") {
      //     $main.addClass("show");
      //   }
      //   $input.on("input", function() {
      //     var keywords = $(this).val();
      //     searchResultToDOM(search(json, keywords));
      //   });
      //   $input.trigger("input");
      // });

      let json = vm.JSON;
      function getJSON(json) {
        if (location.hash.trim() === "#ins-search") {
          $main.addClass("show");
        }
        $input.on("input", function() {
          var keywords = $(this).val();
          searchResultToDOM(search(json, keywords));
        });
        $input.trigger("input");
      }
      getJSON(json);

      var touch = false;
      $(document)
        .on("click focus", ".navbar-main .search", function() {
          $main.addClass("show");
          $main.find(".ins-search-input").focus();
        })
        .on("click touchend", ".ins-search-item", function(e) {
          if (e.type !== "click" && !touch) {
            return;
          }
          gotoLink($(this));
          touch = false;
        })
        .on("click touchend", ".ins-close", function(e) {
          if (e.type !== "click" && !touch) {
            return;
          }
          $main.removeClass("show");
          touch = false;
        })
        .on("keydown", function(e) {
          if (!$main.hasClass("show")) return;
          switch (e.keyCode) {
            case 27: // ESC
              $main.removeClass("show");
              break;
            case 38: // UP
              selectItemByDiff(-1);
              break;
            case 40: // DOWN
              selectItemByDiff(1);
              break;
            case 13: //ENTER
              gotoLink($container.find(".ins-selectable.active").eq(0));
              break;
          }
        })
        .on("touchstart", function(e) {
          touch = true;
        })
        .on("touchmove", function(e) {
          touch = false;
        });
    }
  },
  mounted() {
    document.addEventListener("keydown", this.onHotkey);
    this.setupData();
  },

  beforeDestroy() {
    document.addEventListener("keydown", this.onHotkey);
  }
};
</script>
