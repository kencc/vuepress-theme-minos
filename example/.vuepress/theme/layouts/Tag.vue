<template>
  <div>
    <section class="section section-heading">
      <div class="container">
        <div class="content">
          <h5># </i> {{ tag.key }}</h5>
        </div>
      </div>
    </section>
    <Layout />
  </div>
</template>

<script>
export default {
  computed: {
    tag() {
      return this.$currentTag;
    }
  },
};
</script>
