---
title: 第一篇文章
date: 2020-1-1
archives:
  - "2020"
categories:
  - 網站設計
tags:
  - vuepress
  - vue
---

## 關於這個佈景主題

<h1 v-if="$page.frontmatter.heroText !== null" id="main-title">{{ $page.frontmatter.heroText || $title || 'Hello' }}</h1>

這是我的第一個 VuePress 主題，它是從 Hexo 靜態產生器的主題 Minos 重製的主題。

因為是從頭開始，因此花好多時間在學習 VuePress 這個工具。

![Homebrew logo](https://i.imgur.com/SdgYdVw.png)

## gotofamily

Configure the hotkeys which when pressed will focus the search box. Set to an empty array to disable this feature.

<!-- more -->

## 關於這個佈景主題

這是我的第一個 VuePress 主題，它是從 Hexo 靜態產生器的主題 Minos 重製的主題。

因為是從頭開始，因此花好多時間在學習 VuePress 這個工具。

## gotofamily

Configure the hotkeys which when pressed will focus the search box. Set to an empty array to disable this feature.

## 網站屬性

使用 Global Layout 吧！！

withBase {{ $withBase($site.themeConfig.logo) }}

site: {{ $site }}

page: {{ $page }}

page.frontmatter: {{ $page.frontmatter }}

lang: {{ $lang }}

localPath: {{ $localePath }}

title: {{ $title }}

description: {{ $description }}

themeConfig: {{ $themeConfig }}

這裡是 blog plugin 提供的全域屬性

pagination: {{ typeof(this.$pagination) }}

```html
<template>
  <div class="theme-container">
    <content />
  </div>
</template>
```

```vue
// ~/docs/README.md
<template>
  <ol>
    <li v-for="(item, index) in list" :key="index" @click="go(item)">
      <span class="dir">{{ nav[item.dir] }} /</span>
      <!--匹配当前文章所属栏目-->
      <span class="tit">{{ item.title }}</span>
      <span class="date">{{ item.frontmatter.updateTime }}</span>
      <div class="intro" v-if="item.excerpt" v-html="item.excerpt"></div>
    </li>
  </ol>
</template>

<script>
export default {
  computed: {
    list() {
      let res = this.$site.pages
        .filter((item) => item.regularPath.indexOf(".html") !== -1) //只显示内容页，不显示栏目首页
        .sort((a, b) => {
          const av = a.frontmatter.updateTime
            ? new Date(a.frontmatter.updateTime).valueOf()
            : 0;
          const bv = b.frontmatter.updateTime
            ? new Date(b.frontmatter.updateTime).valueOf()
            : 0;
          return bv - av; //模糊比较，倒序排列，此处未对非预期日期格式作兼容处理
        })
        .filter((item, index) => index < 15) //显示最新15条
        .map((item) => {
          item.dir = "/" + item.path.split("/")[1] + "/";
          return item;
        });
      return res;
    },

    //栏目数组
    nav() {
      const n = this.$site.themeConfig.sidebar;
      let res = {};
      for (let key in n) {
        res[key] = n[key][0].title;
      }
      return res;
    },
  },

  methods: {
    go(item) {
      location.href = item.path;
    },
  },
};
</script>
```

```js {10}
// 新增 [fslist.js]
const YAML = require("yamljs");
const fs = require("fs");

/**
 * @description 取得文件夹中的文章列表元数据
 */
module.exports = function fslist(folder) {
  const path = "./docs/" + folder + "/";
  const files = fs.readdirSync(path);
  let list = [];
  for (let item of files) {
    let file = {};
    file.filename = item
      .split(".")
      .slice(0, -1)
      .join(".");
    if (file.filename.toLowerCase() === "readme") {
      continue;
    }

    let stat = fs.statSync(path + item);
    let fstr = fs
      .readFileSync(path + item)
      .toString()
      .replace("\r\n", "");
    file.createTime = stat.birthtime;
    file.mTime = stat.mtime;
    if (fstr.indexOf("---") !== -1) {
      let cstr = fstr.split("---");
      let fobj = YAML.parse(cstr.length ? cstr[1] : cstr[0]);
      file.title = fobj.title;
      file.description = fobj.description;
      file.pic = fobj.pic;
    }
    fs.closeSync(2);

    list.push(file);
  }
  return list;
};

// [config.js]
const fslist = require("./fslist.js");

// 取得顶部导航所需的配置数据
function getSubNav(folder) {
  const fs = fslist(folder);
  return fs.map((item) => {
    return folder + item.filename;
  });
}

// 取得侧边导航所需的配置数据
function getSidebar(cols) {
  let obj = {};
  cols.forEach(
    (item) =>
      (obj[item.link] = [
        {
          title: item.text,
          collapsable: false,
          children: getSubNav(item.link),
        },
      ])
  );
  return obj;
}

const columns = [
  { text: "前端", link: "/FE/" },
  { text: "观点", link: "/VIEWPOINT/" },
  { text: "杂谈", link: "/ESSAY/" },
  { text: "关于", link: "/ABOUT/" },
];

module.exports = {
  // 省略其他配置
  themeConfig: {
    nav: [{ text: "首页", link: "/" }, ...columns],
    sidebar: getSidebar(columns),
  },
  dest: "../docs/",
};
```
