<template>
  <nav
    class="navbar is-transparent is-fixed-top navbar-main"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item navbar-logo" :href="$localePath">
          <img
            v-if="$site.themeConfig.logo"
            :src="$withBase($site.themeConfig.logo)"
            alt
            height="28"
          />
        </a>

        <div
          class="navbar-burger"
          @click="menuOpened = !menuOpened"
          :class="{ 'is-active': menuOpened }"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        class="navbar-menu navbar-start"
        :class="{ 'is-active': menuOpened }"
      >
        <a
          class="navbar-item"
          v-for="(item, index) in navMenu"
          :href="item.link"
          >{{ item.text }}</a
        >
      </div>

      <div class="navbar-menu navbar-end" :class="{ 'is-active': menuOpened }">
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
  data() {
    return {
      menuOpened: false,
      lastScrollTop: 0,
      showSearchBox: false,
    };
  },
  methods: {
    clickSearch() {
      this.$emit("SearchBoxOn");
    },
    handleScroll() {
      // Hide Header on on scroll down
      var delta = 5;
      var navbarHeight = $(".navbar-main").outerHeight(); // navbarHeight is 53
      var st = $(window).scrollTop();
      //console.log("ScrollTop:", st);
      //console.log("lastScrollTop:", this.lastScrollTop);

      // Make sure they scroll more than delta
      if (Math.abs(this.lastScrollTop - st) <= delta) {
        return;
      }

      // If they scrolled down and are past the navbar, add class .navbar-down.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > this.lastScrollTop && st > navbarHeight) {
        var posY = Math.min(st, navbarHeight);
        // Scroll Down
        $(".navbar-main").css({
          "-webkit-transform": "translateY(-" + posY + "px)",
          "-moz-transform": "translateY(-" + posY + "px)",
          "-ms-transform": "translateY(-" + posY + "px)",
          "-o-transform": "translateY(-" + posY + "px)",
          transform: "translateY(-" + posY + "px)",
        });
        //console.log("hide navbar");
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $(".navbar-main").css({
            "-webkit-transform": "translateY(0px)",
            "-moz-transform": "translateY(0px)",
            "-ms-transform": "translateY(0px)",
            "-o-transform": "translateY(0px)",
            transform: "translateY(0px)",
          });
        }
      }
      this.lastScrollTop = st;
    },
  },
  computed: {
    navMenu() {
      return this.$site.themeConfig.navMenu || [];
    },
    navLinks() {
      return this.$site.themeConfig.navLinks || [];
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
