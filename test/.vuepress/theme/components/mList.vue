<template>
  <div>
    <article
      class="article content gallery"
      itemscope
      itemprop="blogPost"
      v-for="page in pages"
      :key="page.key"
    >
      <h1 class="article-title is-size-3 is-size-4-mobile" itemprop="name">
        <a :href="page.path" itemprop="url">{{ page.title }}</a>
      </h1>
      <div
        class="article-meta columns is-variable is-1 is-multiline is-mobile is-size-7-mobile"
      >
        <span class="column is-narrow">
          <font-awesome-icon :icon="['far', 'calendar-alt']" />
          <time :datetime="page.frontmatter.date" itemprop="datePublished">{{
            resolvePostDate(page.frontmatter.date)
          }}</time>
        </span>
        <span class="column is-narrow article-category">
          <font-awesome-icon :icon="['far', 'folder']" />
          <a
            class="article-category-link"
            v-for="category in resolvePostCategories(
              page.frontmatter.categories
            )"
            :href="'/categories/' + category"
            >{{ category }}</a
          >
        </span>
        <span class="column is-narrow"
          >{{ page.readingTime.text }} (about
          {{ page.readingTime.words }} words)</span
        >
      </div>
      <!-- Summary & Excerpt -->
      <div class="article-entry is-size-6-mobile" itemprop="articleBody">
        {{ page.frontmatter.summary || page.summary }}
        <div v-html="page.excerpt"></div>
        <!-- <Content :page-key="page.key" slot-key="intro" /> -->
        <p class="article-more-link">
          <a :href="page.path">Read More</a>
        </p>
      </div>
    </article>
    <mPagination v-if="this.$pagination.length > 1" />
  </div>
</template>

<script>
import mPagination from "@theme/components/mPagination";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default {
  name: "mList",
  data() {
    return {
      //paginationComponent: null
    };
  },
  methods: {
    resolvePostDate(date) {
      //return dayjs(date).format(this.$themeConfig.dateFormat || "MMM DD YYYY");
      return dayjs(date).fromNow();
    },
    resolvePostCategories(categories) {
      if (!categories || Array.isArray(categories)) return categories;
      return [categories];
    },
  },
  computed: {
    pages() {
      return this.$pagination.pages;
    },
  },
  components: {
    mPagination,
  },
};
</script>
