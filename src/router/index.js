import Vue from "vue";
import VueRouter from "vue-router";
import ServicesList from "../components/Services/ServicesList.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "ServicesList",
        component: ServicesList,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
