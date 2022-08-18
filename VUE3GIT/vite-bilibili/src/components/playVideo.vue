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
        "https://upos-hz-mirrorakam.akamaized.net/upgcxcode/38/87/801458738/801458738_u1-1-64.flv?e=ig8euxZM2rNcNbNz7bdVhwdlhbhjhwdVhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1660730569&gen=playurlv2&os=akam&oi=2053435398&trid=ffbee91fae594159b2be938696fa0a57u&mid=31088511&platform=pc&upsig=788186c189065792dbe93f9c0c4454dd&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&hdnts=exp=1660730569~hmac=d18eaf6548f2d935ff1ba84ca260d75a06575280e7a934d1b7cf446eca26717c&bvc=vod&nettype=0&orderid=0,1&agrr=1&bw=236936&logo=80000000",
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
