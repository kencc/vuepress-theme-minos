<template>
  <div>
    <div class="sharethis-inline-share-buttons"></div>
  </div>
</template>

<script>
export default {
  name: "mSharethis",
  props: {
    shareThisElementId: {
      type: String,
      default: "st-2"
    },
    shareThisEmbedUrl: {
      type: String,
      required: true
    }
    // url: {
    //   type: String,
    //   default: window.location.href
    // }
  },
  beforeDestroy() {
    const element = document.getElementById(this.shareThisElementId);
    if (element) {
      element.style.display = "none";
    }
  },
  mounted() {
    let url = window.location.href;
    if (window.__sharethis__) {
      window.__sharethis__.href = url;
      window.__sharethis__.initialize();
      const element = document.getElementById(this.shareThisElementId);
      if (element) {
        element.style.display = "block";
      }
      console.log("initialize shareThis");
    } else {
      const shareScript = document.createElement("script");
      shareScript.setAttribute("src", this.shareThisEmbedUrl);
      shareScript.setAttribute("async", "true");
      shareScript.onload = () => {
        window.__sharethis__.href = url;
      };
      document.head.appendChild(shareScript);
    }
  }
};
</script>