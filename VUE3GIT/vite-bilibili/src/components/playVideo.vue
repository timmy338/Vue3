<template>
  <div class="play" ref="artRef" style="display:none"></div>
</template>
<script>
import Artplayer from "artplayer";
import flvjs from "flv.js";

export default {
  data() {
    return {
      instance: null,
    };
  },
  /*   props: {
    option: {
      type: Object,
      required: true,
    },
  }, */
  mounted() {
    this.instance = new Artplayer({
      url:
        "https://www.bilibili.com/9feb2261-6147-4b2d-a0c9-309e22ba3dd3",
      container: this.$refs.artRef,
      /* autoplay: true, */
      customType: {
        flv: function (video, url) {
          if (flvjs.isSupported()) {
            const flvPlayer = flvjs.createPlayer({
              type: "flv",
              url: url,
            });
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
          } else {
            art.notice.show = "不支持播放格式：flv";
          }
        },
      },
    });
    this.$nextTick(() => {
      this.$emit("get-instance", this.instance);
    });
  },
  beforeUnmount() {
    if (this.instance && this.instance.destroy) {
      this.instance.destroy(false);
    }
  },
};
</script>
<style>
.play {
  width: 885px;
  height: 498px;
  margin-top: 30px;
}
</style>
