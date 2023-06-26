import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "@/pages/HomePage.vue";
import MoviesPage from "@/pages/MoviesPage.vue";
import NotFound from "@/pages/NotFound.vue";

const routes = [
    {path: '/', name: 'Home', component: HomePage},
    {path: '/movies', name: 'Movies', component: MoviesPage},
    {path: '/404', name: 'NotFound', component: NotFound},
    {path: '/:catchAll(.*)', redirect: '/404'}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;