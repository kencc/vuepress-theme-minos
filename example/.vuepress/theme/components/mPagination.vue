<template>
  <div>
    <nav class="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
      <div
        class="pagination-previous"
        :class="{ 'is-invisible': !$pagination.hasPrev, 'is-hidden-mobile': !$pagination.hasPrev }"
      >
        <a href="#" @click="clickCallback($pagination.paginationIndex)">Prev</a>
      </div>
      <div
        class="pagination-next"
        :class="{ 'is-invisible': !$pagination.hasNext, 'is-hidden-mobile': !$pagination.hasNext }"
      >
        <a href="#" @click="clickCallback($pagination.paginationIndex + 2)">Next</a>
      </div>
      <ul class="pagination-list is-hidden-mobile">
        <li v-for="pageNum in $pagination.length">
          <a
            class="pagination-link"
            :class="{ 'is-current': $pagination.paginationIndex === pageNum - 1 }"
            href="#"
            @click="clickCallback(pageNum)"
          >{{ pageNum }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "mPagination",
  data() {
    return {};
  },
  methods: {
    clickCallback(pageNum) {
      const link = this.$pagination.getSpecificPageLink(pageNum - 1);
      this.$router.push(link);
    }
  }
};
</script>