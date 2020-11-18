import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import CrewIndex from "../views/layout/CrewIndex.vue";


import Crew from "./crew/router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "layout",
    component: CrewIndex,
    children: [
		...Crew
    ],
  },
];

const router = new VueRouter({
  routes,
});


export default router;
