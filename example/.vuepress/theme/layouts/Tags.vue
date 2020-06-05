<template>
  <div>
    <section class="section section-heading">
      <div class="container">
        <div class="content">
          <h5># {{ this.$frontmatter.title }}</h5>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-variable is-1 is-multiline is-mobile">
          <span class="column is-narrow" v-for="tag in tags" :key="tag.name">
            <a
              class="tag is-light article-tag"
              :href="tag.path"
            >{{ tag.name }} ({{ tag.pages.length }})</a>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    tags() {
      return this.$frontmatterKey.list;
    }
  },
  created() {
    console.log("TAGS this.$frontmatterKey", this.$frontmatterKey);
  }
};
</script>
