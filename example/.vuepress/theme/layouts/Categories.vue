<template>
  <div>
    <section class="section section-heading">
      <div class="container">
        <div class="content">
          <h5>
            <font-awesome-icon :icon="['far', 'folder']" />
            {{ this.$frontmatter.title }}
          </h5>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-variable is-1 is-multiline is-mobile">
          <span
            class="column is-narrow"
            v-for="category in categories"
            :key="category.name"
          >
            <a class="tag is-light article-tag" :href="category.path"
              >{{ category.name }} ({{ category.pages.length }})</a
            >
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$frontmatterKey.list;
    },
  },
};
</script>
