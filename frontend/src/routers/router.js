import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "@/pages/HomePage.vue";
import NotFound from "@/pages/NotFound.vue";
import TicketsPage from "@/pages/TicketsPage.vue";

const routes = [
    {path: '/', name: 'Home', component: HomePage},
    {path: '/tickets', name: 'Tickets', component: TicketsPage},
    {path: '/404', name: 'NotFound', component: NotFound},
    {path: '/:catchAll(.*)', redirect: '/404'}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;