import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/home/Index.vue";
// import Scan from "../views/home/Scan.vue";
import Scan from "./scan/router";
import ScanH5 from "../views/home/ScanH5.vue";
import Internet from "../views/home/Internet.vue";
import InternetCart from "../views/home/components/InternetCart.vue";
import About from "../views/About.vue";
import LayoutIndex from "../views/layout/index.vue";
import FlightRouter from "./flight/router";
import DishRouter from "./dish/router";
import ShoppingRouter from "./shopping/router";
import VideoRouter from "./video/router";
import LoginRouter from "./login/router";
import NewsRouter from "./news/router";
import GameRouter from "./game/router";
import MessageRouter from "./message/router";
import MusicRouter from "./music/router";
import Me from "./me/router";
// import Scan from "./scan/router";
import AboutUs from "../views/home/AboutUs.vue";
import {localStore} from '../utils/data-management';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "layout",
    component: LayoutIndex,
    children: [
		...Scan,
      ...FlightRouter,
      ...DishRouter,
      ...ShoppingRouter,
      ...NewsRouter,
      ...VideoRouter,
      ...LoginRouter,
      ...GameRouter,
      ...MessageRouter,
	    ...MusicRouter,
      ...Me,
      {
        path: "/home",
        name: "home",
        component: Home,
        meta:{
          keepAlive: false
        }
      },
     /* {
        path: "/scan",
        name: "scan",
        component: Scan,
        meta:{
          keepAlive: false
        }
      }, */
      {
        path: "/scanH5",
        name: "scanH5",
        component: ScanH5,
        meta:{
          keepAlive: false
        }
      },
      {
        path: "/internet",
        name: "internet",
        component: Internet,
        meta:{
          keepAlive: true
        }
      },
      {
        path: "/internet/cart",
        name: "internetCart",
        component: InternetCart,
        meta:{
          keepAlive: false
        }
      },
      {
        path: "/about",
        name: "about",
        component: About,
        meta:{
          keepAlive: false
        }
      },
      {
        path: "/aboutUs",
        name: "aboutUs",
        component: AboutUs,
        meta:{
          keepAlive: false
        }
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

//获取token
router.beforeEach((to, from, next) => {
	//localStore
	/* import {localStore} from '../utils/data-management';*/
	
 /* let islogin = localStore.get('token');
  islogin = Boolean(islogin); */

   let islogin = localStore.get('token');
               // debugger;   
    
    islogin = Boolean(islogin);
    
    if(to.meta.noRequireAuth ||islogin) {
      next();
    }else{
  	  // next();
        next("/login");
    }  
  
  /* if(to.name == "/login"){
    if(islogin){
      next("/table");
    }else{  
      next();
    }
  }else{
    if(to.meta.requireAuth && islogin) {
      next();
    }else{
      next("/login");
    }
  } */
});

export default router;
