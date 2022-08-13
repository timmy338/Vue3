<!--  -->
<template>
<TopList></TopList>
 <div>video Page</div> 
</template>

<script lang='ts' setup>
import { reactive,toRefs,ref,onMounted} from 'vue'; 
import { getVideo } from "../request/api";
import TopList from "../components/topList.vue";
const data={
    bv:'BV1fY4y1F7GL',
}
onMounted(() => {
    getVideo(data.bv).then((res)=>{
        console.log(res);
    }).catch(() => {
      alert("獲取視頻失敗");
    });
});

/* import { useRoute } from "vue-router";
const Route=useRoute();
console.log(Route.query) */
</script>
<style lang='less' scoped>

</style>