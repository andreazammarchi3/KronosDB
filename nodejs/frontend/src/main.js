import { createApp } from "vue";
import App from "./App.vue";
import router from "@/routers/router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
app.use(router);
app.mount("#app");

const BASE_URL = 'http://localhost:3000';
export { BASE_URL };
