<template>
  <div class="play" ref="artRef"></div>
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
        "https://upos-hz-mirrorakam.akamaized.net/upgcxcode/28/17/803001728/803001728_nb3-1-64.flv?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1660561095&gen=playurlv2&os=akam&oi=2053435398&trid=0b330696889f472ba296bcac56b2a707u&mid=31088511&platform=pc&upsig=bd4617ae10f6c71dd599b7a36a0f895d&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&hdnts=exp=1660561095~hmac=383707fc97e21d36a8c7d169daa40fa15b495f46c593af7fecbd1dce1cc074d6&bvc=vod&nettype=0&orderid=0,1&agrr=1&bw=69961&logo=80000000",
      container: this.$refs.artRef,
      autoplay: true,
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
