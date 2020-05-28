<template>
  <section class="section">
    <div class="container">
      <article class="article content gallery" itemscope itemprop="blogPost">
        <h1 class="article-title is-size-3 is-size-4-mobile" itemprop="name">
          {{ $page.title }}
        </h1>
        <div
          class="article-meta columns is-variable is-1 is-multiline is-mobile is-size-7-mobile"
        >
          <span class="column is-narrow">
            <font-awesome-icon :icon="['far', 'calendar-alt']" />
            <time :datetime="$page.frontmatter.date" itemprop="datePublished">
              {{ resolvePostDate($page.frontmatter.date) }}
            </time>
          </span>
          <span class="column is-narrow article-category">
            <font-awesome-icon :icon="['far', 'folder']" />
            <a
              class="article-category-link"
              v-for="category in resolvePostCategories(
                $page.frontmatter.categories
              )"
              :href="'/categories/' + category"
              >{{ category }}</a
            >
          </span>
          <span class="column is-narrow">
            {{ $page.readingTime.text }} (about
            {{ $page.readingTime.words }} words)
          </span>
        </div>
        <Content
          class="article-entry is-size-6-mobile"
          itemprop="articleBody"
        />

        <div class="columns is-variable is-1 is-multiline is-mobile">
          <span class="column is-narrow" v-for="tag in tags">
            <a class="tag is-light article-tag" @click="linkToTags(tag)"
              >#{{ tag }}</a
            >
          </span>
        </div>
        <div class="columns is-mobile is-multiline article-nav">
          <span class="column is-12-mobile is-half-desktop article-nav-prev">
            <a v-if="hasPrev" @click="linkToPages(prevLink)">{{ prevTitle }}</a>
          </span>
          <span class="column is-12-mobile is-half-desktop article-nav-next">
            <a v-if="hasNext" @click="linkToPages(nextLink)">{{ nextTitle }}</a>
          </span>
        </div>
      </article>
      <div class="sharebox">
        <mSharethis
          share-this-embed-url="https://platform-api.sharethis.com/js/sharethis.js#property=5e7ab9fe192d8a0012be9a58&product=inline-share-buttons"
        />
      </div>
      <div class="comments">
        <h3 class="title is-4">Comments</h3>
        <Comment />
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { Comment } from "@vuepress/plugin-blog/lib/client/components";
import mSharethis from "@theme/components/mSharethis";

// Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default {
  name: "Post",
  data() {
    return {
      allPages: {},
    };
  },
  methods: {
    // 格式化文章時間
    resolvePostDate(date) {
      //return dayjs(date).format(this.$themeConfig.dateFormat || "MMM DD YYYY");
      return dayjs(date).fromNow();
    },

    // 處理標籤資料
    resolvePostCategories(categories) {
      if (!categories || Array.isArray(categories)) return categories;
      return [categories];
    },
    linkToTags(tag) {
      let link = `/tags/${tag}/`;
      this.$router.push(link);
    },
    linkToPages(path) {
      this.$router.push(path);
    },
  },
  computed: {
    tags() {
      return this.$frontmatter.tags;
    },
    allPostsPages() {
      const vm = this;
      const pages = vm.$site.pages.filter((item, index) => item.id);
      pages.sort(function(a, b) {
        return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
      });
      return pages;
    },
    pageIndex() {
      const vm = this;
      const pages = vm.allPostsPages;
      let pageId = vm.$route.name;
      let findIndex = pages.findIndex((item, index) => item.key === pageId);
      return findIndex;
    },
    hasPrev() {
      let num = this.pageIndex;
      return num != 0 ? true : false;
    },
    hasNext() {
      let num = this.pageIndex;
      let len = this.allPostsPages.length;
      return num != len - 1 ? true : false;
    },
    prevLink() {
      if (!this.hasPrev) {
        return null;
      }
      let prevIndex = this.pageIndex - 1;
      return this.allPostsPages[prevIndex].path;
    },
    prevTitle() {
      if (!this.hasPrev) {
        return null;
      }
      let prevIndex = this.pageIndex - 1;
      return this.allPostsPages[prevIndex].title;
    },
    nextLink() {
      if (!this.hasNext) {
        return null;
      }
      let nextIndex = this.pageIndex + 1;
      return this.allPostsPages[nextIndex].path;
    },
    nextTitle() {
      if (!this.hasNext) {
        return null;
      }
      let nextIndex = this.pageIndex + 1;
      return this.allPostsPages[nextIndex].title;
    },
  },
  created() {
    console.log("Post:", "this.$site", this.$site);
    console.log("Post:", "this.$page", this.$page);
    console.log("Post:", "this.$page.excerpt", this.$page.excerpt);
    console.log("Post:", "this.$Pagination", this.$pagination);
    console.log("vm.allPostsPages", this.allPostsPages);
    console.log("this.$route", this.$route);
  },
  components: {
    Comment,
    mSharethis,
  },
};
</script>
