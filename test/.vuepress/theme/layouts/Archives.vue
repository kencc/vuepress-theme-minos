<template>
  <section class="section">
    <div class="container">
      <div class="archive content" v-for="year in years">
        <h4 class="title is-4" :id="year">{{ year }}</h4>
        <div class="articles">
          <div class="article content" v-for="item in groups[year]">
            <time class="is-text-small" datetime itemprop="datePublished">
              {{
              resolvePostDate(item.frontmatter.date)
              }}
            </time>
            <h6 class="title is-6">
              <router-link :to="item.path">{{ item.title }}</router-link>
            </h6>
          </div>
        </div>
      </div>
      <nav class="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
        <div
          class="pagination-previous"
          :class="{
            'is-invisible': !pagination.hasPrev,
            'is-hidden-mobile': !pagination.hasPrev,
          }"
        >
          <a href="#" @click="switchPages(pagination.paginationIndex - 1)">Prev</a>
        </div>
        <div
          class="pagination-next"
          :class="{
            'is-invisible': !pagination.hasNext,
            'is-hidden-mobile': !pagination.hasNext,
          }"
        >
          <a href="#" @click="switchPages(pagination.paginationIndex + 1)">Next</a>
        </div>
        <ul class="pagination-list is-hidden-mobile">
          <li v-for="(page, index) in pagination._paginationPages">
            <a
              class="pagination-link"
              :class="{ 'is-current': pagination.paginationIndex === index }"
              href="#"
              @click="switchPages(index)"
            >{{ index + 1 }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "Archives",
  data() {
    return {
      groups: {},
      years: [],
      pagination: {
        lengthPerPage: 10,
        _currentPage: {},
        _matchedPages: [],
        _paginationPages: [],
        paginationIndex: 0,
        pages: [],
        hasPrev: false,
        hasNext: false
      }
    };
  },
  methods: {
    resolvePostDate(date) {
      return dayjs(date).format("MMM DD");
    },
    switchPages(pageIndex) {
      const vm = this;
      this.groups = {};
      this.years = [];
      vm.pagination.paginationIndex = pageIndex;
      vm.getPaginationPages();
    },
    getPages() {
      const vm = this;
      const postPages = vm.$site.pages.filter((item, index) => item.id);
      vm.pagination._matchedPages = postPages;
    },
    getLengthPerPage() {
      let num = 5;
      this.pagination.lengthPerPage = num;
    },
    getIntervallers() {
      const vm = this;
      let max = vm.pagination._matchedPages.length;
      let interval = vm.pagination.lengthPerPage;
      function getIntervallers(max, interval) {
        const count =
          max % interval === 0
            ? Math.floor(max / interval)
            : Math.floor(max / interval) + 1;
        const arr = [...new Array(count)];
        return arr.map((_, index) => {
          const start = index * interval;
          const end = (index + 1) * interval - 1;
          return [start, end > max ? max : end];
        });
      }
      const intervallers = getIntervallers(max, interval);
      intervallers.forEach(function(item, index) {
        vm.pagination._paginationPages[index] = { interval: item };
      });
    },
    getPaginationPages() {
      const vm = this;
      const postPages = vm.pagination._matchedPages;
      const intervallers = vm.pagination._paginationPages;
      let pageIndex = vm.pagination.paginationIndex;
      let start = vm.pagination._paginationPages[pageIndex].interval[0];
      let end = vm.pagination._paginationPages[pageIndex].interval[1];

      let paginationPages = postPages.filter(function(item, index) {
        return index >= start && index <= end;
      });
      vm.pagination.pages = paginationPages;

      paginationPages.forEach(function(item, index) {
        let str = item.frontmatter.date || "1970-01-01";
        let year = str.slice(0, 4);
        if (typeof vm.groups[year] === "undefined") {
          vm.groups[year] = [];
          vm.years.push(year);
        }
        vm.groups[year].push(paginationPages[index]);
      });
      vm.years.sort((a, b) => b - a);

      pageIndex === 0
        ? (vm.pagination.hasPrev = false)
        : (vm.pagination.hasPrev = true);

      pageIndex != intervallers.length - 1
        ? (vm.pagination.hasNext = true)
        : (vm.pagination.hasNext = false);
    }
  },
  created() {
    this.getPages();
    this.getLengthPerPage();
    this.getIntervallers();
    this.getPaginationPages();
  }
};
</script>
