<template>
  <div id="global-layout">
    <mNavbar
      @SearchBoxOn="toggleSearchBox"
      @toggleMenu="toggleMenu"
      :MobileMenuState="MobileMenuState"
    />
    <component :is="layout" />
    <mFooter />
    <mSearchBox
      :show="SearchBoxState"
      @hideSearchBox="hideSearchBox"
      @showSearchBox="showSearchBox"
      @toggleMenu="toggleMenu"
    />
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
      MobileMenuState: false
    };
  },
  methods: {
    showSearchBox() {
      this.SearchBoxState = true;
    },
    hideSearchBox() {
      this.SearchBoxState = false;
    },
    toggleSearchBox() {
      return (this.SearchBoxState = !this.SearchBoxState);
    },
    toggleMenu() {
      return (this.MobileMenuState = !this.MobileMenuState);
    }
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
    }
  },
  mounted() {
    document.addEventListener("keydown", this.onHotkey);
  },

  beforeDestroy() {
    document.addEventListener("keydown", this.onHotkey);
  },
  components: {
    mNavbar,
    mFooter,
    Archives,
    mSearchBox
  }
};
</script>
