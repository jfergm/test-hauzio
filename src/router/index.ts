import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LocationsView from "@/views/LocationsView.vue";
import AdminView from "@/views/AdminView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
  {
    path: "/locations",
    name: "locations",
    component: LocationsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
