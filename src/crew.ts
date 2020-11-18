import Vue from 'vue';
import App from './App.vue';
import router from './router/crew';
import store from './store/';
import filters from './utils/filters/index';
//引入Vant  
import Vant from 'vant';
import 'vant/lib/index.css';
import VueI18n from 'vue-i18n'
import { Lazyload } from 'vant';
//引入rem适配
// import 'amfe-flexible/index.js';
// import myCharts from './comm/js/myCharts.js';
// https://www.cnblogs.com/fqh123/p/11981646.html

filters.forEach((filter: any, index) => {
  Vue.filter(filter.name, filter.handler)
});
   
// Vue.use(myCharts);
Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.use(VueI18n);

//  import Vconsole from 'vconsole'
//  const vConsole: any = new Vconsole();
//  Vue.use(vConsole)

let locale = localStorage.getItem('lang') || 'en';
let i18n = new VueI18n({
  locale: locale,
  silentTranslationWarn: true,
  messages: {
    'zh': require('./assets/i18n/zh.json'),
    'en': require('./assets/i18n/en.json')
  }
});

localStorage.setItem('lang', locale);

Vue.config.productionTip = false;
Vue.prototype.$globalEvent = new Vue;
// Vue.prototype.$globalEvent = new Vue;


function getHostUrl(){
   return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

//可根据具体环境配置
if(location.href.indexOf('localhost') > -1 ){
	//http://172.16.125.11:8010/
 /* (Vue.config as any).SERVER_API = 'http://kf.vpclub.cn/guangmei/api';
  (Vue.config as any).mapImgBase = getHostUrl()  + '/mapimg';
  (Vue.config as any).imgBase = getHostUrl()  + '/abusimg'; */
  
  
  //http://172.16.8.69:8084/8/208/110.png
  // http://172.16.125.11:8010/eb8ea336-9434-4295-8215-3821c76baba8
}else{
/*  (Vue.config as any).SERVER_API = getHostUrl() +'/guangmei/api';
  (Vue.config as any).mapImgBase = getHostUrl()  + '/mapimg';
  (Vue.config as any).imgBase = getHostUrl()  + '/abusimg'; */
}


let host = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

(Vue.config as any).host = host;