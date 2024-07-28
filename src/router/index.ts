import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexPageView from "@/views/IndexPageView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: IndexPageView,
  },
  {
    path: "/:category",
    component: IndexPageView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
