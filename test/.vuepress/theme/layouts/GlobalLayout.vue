<template>
  <div id="global-layout">
    <mNavbar @SearchBoxOn="showSearchBox" />
    <component :is="layout" />
    <mFooter />
    <mSearchBox :show="SearchBoxState" @SearchBoxOff="hideSearchBox" />
  </div>
</template>

<script>
import mNavbar from "@theme/components/mNavbar";
import mFooter from "@theme/components/mFooter";
import Archives from "@theme/layouts/Archives";
import mSearchBox from "@theme/components/mSearchBox";

export default {
  data() {
    return {
      SearchBoxState: false,
    };
  },
  methods: {
    showSearchBox() {
      this.SearchBoxState = true;
    },
    hideSearchBox() {
      this.SearchBoxState = false;
    },
  },
  computed: {
    layout() {
      if (this.$page.path) {
        if (this.$frontmatter.layout) {
          return this.$frontmatter.layout;
        }
        if (this.$page.path === "/archives/") {
          this.$frontmatter.layout = "Archives";
          this.$frontmatter.title = "Archives";
          return "Archives";
        }
        return "Layout";
      }
      return "NotFound";
    },
  },
  components: {
    mNavbar,
    mFooter,
    Archives,
    mSearchBox,
  },
};
</script>
