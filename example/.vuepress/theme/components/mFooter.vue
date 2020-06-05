<template>
  <footer class="footer">
    <div class="container">
      <div class="columns content">
        <div class="column is-narrow has-text-centered">
          Copyright &copy; {{ thisYear }}
          {{ this.$site.themeConfig.author || this.$site.title }}&nbsp; Powered
          by
          <a
            href="https://vuepress.vuejs.org/"
            target="_blank"
          >VuePress</a> &
          <a href="#">Minos</a>
        </div>
        <div class="column is-hidden-mobile"></div>
        <div class="column is-narrow">
          <div class="columns is-mobile is-multiline is-centered">
            <a
              class="column is-narrow has-text-black"
              v-for="item in footerLinks"
              :title="item.name"
              :href="item.link"
              target="_blank"
            >
              <span v-if="item.name">{{ item.name }}</span>
              <i :class="item.icon" v-else></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "mFooter",
  computed: {
    thisYear() {
      let d = new Date();
      return d.getFullYear();
    },
    footerLinks() {
      return this.$site.themeConfig.footerLinks || [];
    }
  }
};
</script>