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
  },
  methods: {
    attachScript() {
      const shareScript = document.createElement("script");
      shareScript.setAttribute("src", this.shareThisEmbedUrl);
      shareScript.setAttribute("async", "true");
      document.head.appendChild(shareScript);
    }
  },
  beforeDestroy() {
    const el = document.getElementById(this.shareThisElementId);
    if (el) {
      el.style.display = "none";
    }
  },
  mounted() {
    this.attachScript();
  },
  updated() {
    this.attachScript();
  }
};
</script>