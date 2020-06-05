// .vuepress/config.js
module.exports = {
  theme: "vuepress-theme-minos",
  title: "Minos",
  description: "VuePress theme - Minos",
  head: [["link", { rel: "icon", href: "/assets/img/favicon.png" }]],
  markdown: {
    lineNumbers: true,
    anchor: { permalinkSymbol: "" },
  },
  themeConfig: {
    author: "Ken Chen",
    logo: "/assets/img/logo.png",
    navMenu: [
      { text: "Archives", link: "/archives/" },
      { text: "Categories", link: "/categories/" },
      { text: "Tags", link: "/tags/" },
      { text: "About", link: "/about/" },
    ],
    navLinks: [
      {
        name: "GitHub",
        icon: ["fab", "github"],
        link: "https://github.com/kencc",
      },
      {
        name: "Medium",
        icon: ["fab", "medium-m"],
        link: "https://medium.com/@ken.3ds",
      },
      {
        name: "Twitter",
        icon: ["fab", "twitter"],
        link: "https://twitter.com/kencclove",
      },
    ],
    footerLinks: [
      {
        name: "GitHub",
        icon: ["fab", "github"],
        link: "https://github.com/kencc",
      },
      {
        name: "RSS",
        icon: ["fab", "github"],
        link: "https://kencc.github.io/rss.xml",
      },
    ],
    share: {
      type: "sharethis",
      installURL:
        "https://platform-api.sharethis.com/js/sharethis.js#property=5e7ab9fe192d8a0012be9a58&product=inline-share-buttons",
    },
  },
  plugins: [
    [
      "@vuepress/blog",
      {
        directories: [
          {
            id: "post",
            dirname: "_posts",
            path: "/",
          },
        ],
        frontmatters: [
          {
            id: "category",
            keys: ["categories"],
            path: "/categories/",
            layout: "Categories",
            scopeLayout: "Category",
          },
          {
            id: "tag",
            keys: ["tags"],
            path: "/tags/",
            layout: "Tags",
            scopeLayout: "Tag",
          },
        ],
        globalPagination: {
          lengthPerPage: 5,
        },
        comment: {
          service: "disqus",
          shortname: "kencc",
        },
        feed: {
          canonical_base: "https://kencc.github.io/",
        },
        sitemap: {
          hostname: "https://kencc.github.io/",
        },
      },
    ],
  ],
};
