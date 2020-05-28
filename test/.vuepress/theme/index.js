const path = require("path");
// .vuepress/config.js or themePath/index.js
module.exports = {
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
    [
      "@vuepress/search",
      {
        searchMaxSuggestions: 10,
      },
    ],
    ["vuepress-plugin-reading-time"],
    [
      "flexsearch",
      {
        /*
        Plugin custom options
      */
        maxSuggestions: 10, // how many search suggestions to show on the menu, the default is 10.
        searchPaths: ["path1", "path2"], // an array of paths to search in, keep it null to search all docs.
        searchHotkeys: ["s"], // Hot keys to activate the search input, the default is "s" but you can add more.
        searchResultLength: 60, // the length of the suggestion result text by characters, the default is 60 characters.
        /*
        Default FlexSearch options
        To override the default options you can see available options at https://github.com/nextapps-de/flexsearch
      */
        search_options: {
          encode: "icase",
          tokenize: "forward",
          resolution: 9,
          doc: {
            id: "key",
            field: ["title", "content", "headers"],
          },
        },
      },
    ],
  ],
};
