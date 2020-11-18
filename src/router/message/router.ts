import VueRouter, { RouteConfig } from "vue-router";
import MessageIndex from "@/views/message/Index.vue";

const routes: Array<RouteConfig> = [
  {
    path: "/message",
    name: "messageIndex",
    component: MessageIndex,
    meta: {
			keepAlive: false
		},
    children: [],
  },
];

export default routes;
