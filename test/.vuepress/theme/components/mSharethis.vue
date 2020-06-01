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
    // if (window.__sharethis__) {
    //   window.__sharethis__.href = this.url;
    //   const element = document.getElementById(this.shareThisElementId);
    //   if (element) {
    //     element.style.display = "block";
    //   }
    // } else {
    const shareScript = document.createElement("script");
    shareScript.setAttribute("src", this.shareThisEmbedUrl);
    shareScript.setAttribute("async", "true");
    // shareScript.onload = () => {
    //   window.__sharethis__.href = this.url;
    // };
    document.head.appendChild(shareScript);
    // }
  }
};
</script>
