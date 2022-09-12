import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//引入圖標庫
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faHatWizard, faDownload, faUserAstronaut,faEnvelope,faFan,faClock,faLightbulb,faCloudArrowUp,faTableList,faFlag,faCompactDisc,faSchool,faCirclePlay,faComments,faIdBadge,faChartSimple,faHeart,faCoins,faStar,faShare,faFeatherPointed,faAward,faThumbsUp,faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faBilibili,faGratipay,faGooglePlay } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faHatWizard, faDownload, faBilibili, faUserAstronaut,faEnvelope,faFan,faGratipay,faClock,faLightbulb,faCloudArrowUp,faTableList,faFlag,faCompactDisc,faSchool,faCirclePlay,faComments,faIdBadge,faGooglePlay,faChartSimple,faHeart,faCoins,faStar,faShare,faFeatherPointed,faAward,faThumbsUp,faThumbsDown)
//引入elementPlus的圖標庫
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    createApp(App).component(key, component)
}

//滾動加載
import InfiniteScroll from "element-plus";

createApp(App).use(router).use(InfiniteScroll).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
