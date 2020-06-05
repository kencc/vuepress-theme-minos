<template>
  <div>
    <section class="section section-heading">
      <div class="container">
        <div class="content">
          <h5>
            <font-awesome-icon :icon="['far', 'folder']" />
            {{ category.key }}
          </h5>
        </div>
      </div>
    </section>
    <Layout />
  </div>
</template>

<script>
export default {
  computed: {
    category() {
      return this.$currentCategory;
    },
  },
};
</script>
