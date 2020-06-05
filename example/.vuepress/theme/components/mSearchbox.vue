<template>
  <div class="searchbox ins-search" :class="{ 'show': show }">
    <div class="searchbox-mask"></div>
    <div class="searchbox-container ins-search-container">
      <div class="searchbox-input-wrapper">
        <input
          ref="search"
          type="text"
          class="searchbox-input ins-search-input"
          placeholder="Type something..."
          @input="query = $event.target.value"
        />
        <span class="searchbox-close ins-close ins-selectable" @click="hideSearchBox">
          <font-awesome-icon :icon="['fa', 'times-circle']" />
        </span>
      </div>
      <div class="searchbox-result-wrapper ins-section-wrapper">
        <div class="ins-section-container">
          <section class="ins-section" v-if="suggestions.posts.length !== 0">
            <header class="ins-section-header">Posts</header>
            <div
              class="ins-selectable ins-search-item"
              v-for="(item, index) in suggestions.posts"
              data-url="item.link"
              :key="index"
              @click="goToLink(item.link)"
            >
              <header>
                <svg
                  class="svg-inline--fa fa-file fa-w-12"
                  aria-hidden="true"
                  data-prefix="fa"
                  data-icon="file"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  data-fa-i2svg
                >
                  <path
                    fill="currentColor"
                    d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
                  />
                </svg>
                <!-- <i class="fa fa-file"></i> -->
                <span class="ins-title">{{ item.title }}</span>
              </header>
              <p class="ins-search-preview">{{ item.text }}</p>
            </div>
          </section>
          <section class="ins-section" v-if="suggestions.pages.length !== 0">
            <header class="ins-section-header">Pages</header>
            <div
              class="ins-selectable ins-search-item"
              v-for="(item, index) in suggestions.pages"
              data-url="item.link"
              :key="index"
              @click="goToLink(item.link)"
            >
              <header>
                <svg
                  class="svg-inline--fa fa-file fa-w-12"
                  aria-hidden="true"
                  data-prefix="fa"
                  data-icon="file"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  data-fa-i2svg
                >
                  <path
                    fill="currentColor"
                    d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
                  />
                </svg>
                <!-- <i class="fa fa-file"></i> -->
                <span class="ins-title">{{ item.title }}</span>
              </header>
              <p class="ins-search-preview">{{ item.text }}</p>
            </div>
          </section>
          <section class="ins-section" v-if="suggestions.categories.length !== 0">
            <header class="ins-section-header">Categories</header>
            <div
              class="ins-selectable ins-search-item"
              data-url="item.link"
              v-for="(item, index) in suggestions.categories"
              :key="index"
              @click="goToLink(item.link)"
            >
              <header>
                <svg
                  class="svg-inline--fa fa-folder fa-w-16"
                  aria-hidden="true"
                  data-prefix="fa"
                  data-icon="folder"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg
                >
                  <path
                    fill="currentColor"
                    d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z"
                  />
                </svg>
                <!-- <i class="fa fa-folder"></i> -->
                <span class="ins-title">{{ item.name }}</span>
                <span class="ins-slug">{{ item.slug }}</span>
              </header>
            </div>
          </section>
          <section class="ins-section" v-if="suggestions.tags.length !== 0">
            <header class="ins-section-header">Tags</header>
            <div
              class="ins-selectable ins-search-item"
              data-url="item.link"
              v-for="(item, index) in suggestions.tags"
              :key="index"
              @click="goToLink(item.link)"
            >
              <header>
                <svg
                  class="svg-inline--fa fa-tag fa-w-16"
                  aria-hidden="true"
                  data-prefix="fa"
                  data-icon="tag"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg
                >
                  <path
                    fill="currentColor"
                    d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"
                  />
                </svg>
                <!-- <i class="fa fa-tag"></i> -->
                <span class="ins-title">{{ item.name }}</span>
                <span class="ins-slug">{{ item.slug }}</span>
              </header>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mSearchbox",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      query: "",
      focused: false,
      JSON: {
        posts: [],
        pages: [],
        tags: [],
        categories: []
      },
      INSIGHT_CONFIG: {
        TRANSLATION: {
          POSTS: "Posts",
          PAGES: "Pages",
          CATEGORIES: "Categories",
          TAGS: "Tags",
          UNTITLED: "(Untitled)"
        },
        CONTENT_URL: ""
      }
    };
  },
  watch: {
    show() {
      this.$nextTick(() => {
        this.focusInput();
      });
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
    hideSearchBox() {
      this.$emit("hideSearchBox");
    },
    showSearchBox() {
      this.$emit("showSearchBox");
    },
    toggleMenu() {
      this.$emit("toggleMenu");
    },
    focusInput() {
      this.$refs.search.focus();
    },
    onHotkey(event) {
      if (event.code === "Escape") {
        this.hideSearchBox();
      }
    },
    parseKeywords(keywords) {
      return keywords
        .split(" ")
        .filter(function(keyword) {
          return !!keyword;
        })
        .map(function(keyword) {
          return keyword.toUpperCase();
        });
    },
    weightFactory(keywords) {
      const vm = this;
      function weight(keywords, obj, fields, weights) {
        var value = 0;
        vm.parseKeywords(keywords).forEach(function(keyword) {
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
    },
    filterFactory(keywords) {
      const vm = this;
      function filter(keywords, obj, fields) {
        var keywordArray = vm.parseKeywords(keywords);
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
    },
    doSearch(json, keywords) {
      const vm = this;
      var WEIGHTS = vm.weightFactory(keywords);
      var FILTERS = vm.filterFactory(keywords);
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
    },
    goToLink(url) {
      this.hideSearchBox();
      this.toggleMenu();
      this.$router.push(url);
      // location.href = url;
    }
  },
  computed: {
    suggestions() {
      const vm = this;
      const keywords = vm.query;
      const json = vm.JSON;
      const suggestions = vm.doSearch(json, keywords);
      return suggestions;
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
