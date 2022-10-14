import { createRouter, createWebHistory } from "vue-router";
import home from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
        },
    ]
})

export default router;