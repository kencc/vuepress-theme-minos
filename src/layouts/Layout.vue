<template>
  <section class="section">
    <div class="container">
      <mList v-if="$pagination" />
      <Content v-else />
    </div>
  </section>
</template>

<script>
import mList from "@theme/components/mList";

export default {
  components: {
    mList,
  },
};
</script>
