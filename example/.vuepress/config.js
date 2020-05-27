// .vuepress/config.js
module.exports = {
  title: "Minos",
  description: "VuePress theme - Minos",
  head: [
    ["link", { rel: "icon", href: "/assets/img/favicon.png" }],
    ["script", { src: "https://kit.fontawesome.com/7a758086ba.js" }],
    [
      "script",
      {
        src: "//cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js",
      },
    ],
  ],
  markdown: {
    lineNumbers: true,
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
  },
};
