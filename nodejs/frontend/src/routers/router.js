import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "@/pages/HomePage.vue";
import NotFound from "@/pages/NotFound.vue";
import TicketsPage from "@/pages/TicketsPage.vue";
import UpdateTicketPage from "@/pages/UpdateTicketPage.vue";
import ClientsPage from "@/pages/ClientsPage.vue";
import UpdateClientPage from "@/pages/UpdateClientPage.vue";
import TechniciansPage from "@/pages/TechniciansPage.vue";
import UpdateTechniciansPage from "@/pages/UpdateTechniciansPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import NotAuthorized from "@/pages/NotAuthorized.vue";

const routes = [
    {path: '/', name: 'Home', component: HomePage},
    {path: '/login', name: 'Login', component: LoginPage},
    {path: '/tickets', name: 'Tickets', component: TicketsPage},
    {path: '/tickets/:id', name: 'Ticket', component: UpdateTicketPage},
    {path: '/clients', name: 'Clients', component: ClientsPage},
    {path: '/clients/:id', name: 'Client', component: UpdateClientPage},
    {path: '/technicians', name: 'Technicians', component: TechniciansPage},
    {path: '/technicians/:id', name: 'Technician', component: UpdateTechniciansPage},
    {path: '/404', name: 'NotFound', component: NotFound},
    {path: '/401', name: 'NotAuthorized', component: NotAuthorized},
    {path: '/:catchAll(.*)', redirect: '/404'}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;