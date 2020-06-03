<template>
  <nav
    class="navbar is-transparent is-fixed-top navbar-main"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item navbar-logo" :to="$localePath">
          <img
            v-if="$site.themeConfig.logo"
            :src="$withBase($site.themeConfig.logo)"
            alt
            height="28"
          />
        </router-link>

        <div
          class="navbar-burger"
          @click="clickMobileMenu"
          :class="{ 'is-active': MobileMenuState }"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu navbar-start" :class="{ 'is-active': MobileMenuState }">
        <router-link
          class="navbar-item"
          v-for="(item, index) in navMenu"
          :to="item.link"
        >{{ item.text }}</router-link>
      </div>

      <div class="navbar-menu navbar-end" :class="{ 'is-active': MobileMenuState }">
        <a class="navbar-item search" title href="#" @click="clickSearch">
          <font-awesome-icon :icon="['fas', 'search']" />
        </a>
        <a
          class="navbar-item"
          :title="item.name"
          v-for="(item, index) in navLinks"
          :href="item.link"
          target="_blank"
          rel="noopener"
        >
          <font-awesome-icon :icon="item.icon" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "mNavbar",
  props: {
    MobileMenuState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuOpened: false,
      lastScrollTop: 0,
      showSearchBox: false
    };
  },
  watch: {
    $route() {
      if (this.MobileMenuState) {
        this.clickMobileMenu();
      }
    }
  },
  methods: {
    clickSearch() {
      this.$emit("SearchBoxOn");
    },
    clickMobileMenu() {
      this.$emit("toggleMenu");
    },
    goToLink(url) {
      this.$router.push(url);
    },
    handleScroll() {
      // Hide Header on on scroll down
      var delta = 5;
      var navbarHeight = document.querySelector(".navbar-main").offsetHeight; // navbarHeight is 53
      var st =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;

      // Make sure they scroll more than delta
      if (Math.abs(this.lastScrollTop - st) <= delta) {
        return;
      }

      // If they scrolled down and are past the navbar, add class .navbar-down.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > this.lastScrollTop && st > navbarHeight) {
        var posY = Math.min(st, navbarHeight);
        // Scroll Down
        document.querySelector(".navbar-main").style.transform =
          "translateY(-" + posY + "px)";
      } else {
        // Scroll Up
        let winHeight = window.document.documentElement.clientHeight;
        let docHeight = document.documentElement.scrollHeight;
        if (st + winHeight < docHeight) {
          document.querySelector(".navbar-main").style.transform =
            "translateY(0px)";
        }
      }
      this.lastScrollTop = st;
    }
  },
  computed: {
    navMenu() {
      return this.$site.themeConfig.navMenu || [];
    },
    navLinks() {
      return this.$site.themeConfig.navLinks || [];
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
