/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import "@theme/styles/index.scss";

//Font Awesome 5 Vue component using SVG with JS
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendarAlt, faFolder } from "@fortawesome/free-regular-svg-icons";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGithub,
  faMediumM,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faCalendarAlt,
  faFolder,
  faSearch,
  faTimesCircle,
  faTwitter,
  faGithub,
  faMediumM
);

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  // ...apply enhancements to the app
  Vue.component("font-awesome-icon", FontAwesomeIcon);
};
