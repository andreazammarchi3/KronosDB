<script>
import {defineComponent} from "vue";
import Header from "@/components/Header.vue";
import ModalAddTicket from "@/components/tickets/ModalAddTicket.vue";
import ModalAddClient from "@/components/clients/ModalAddClient.vue";
import ModalAddTechnician from "@/components/technicians/ModalAddTechnician.vue";
import ModalEditPricePerHourTechnicians from "@/components/technicians/ModalEditPricePerHourTechnicians.vue";

export default defineComponent({
  name: "HomePage",
  components: {Header, ModalEditPricePerHourTechnicians, ModalAddTechnician, ModalAddTicket, ModalAddClient},
  data() {
    return {
      role: null
    };
  },
  mounted() {
    this.role = sessionStorage.getItem("role");
  }
})
</script>

<template>
  <Header></Header>
  <div class="home-container">
    <h1>KronosDB</h1>
     <div class="btn-container">
      <h2>Tickets</h2>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTicket">Nuovo Ticket</button>
      <router-link class="btn btn-primary" :to="{path: '/tickets'}">Elenco Ticket</router-link>
      <ModalAddTicket></ModalAddTicket>
    </div>
    <div class="btn-container">
      <h2>Clienti</h2>
      <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#addClient">Nuovo Cliente</button>
      <router-link class="btn btn-warning" :to="{path: '/clients'}">Elenco clienti</router-link>
      <ModalAddClient></ModalAddClient>
    </div>
    <div class="btn-container" v-if="this.role !== 'BASE'">
      <h2>Tecnici</h2>
      <button v-if="this.role === 'ADMIN'" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addTechnician">Nuovo Tecnico</button>
      <router-link class="btn btn-info" :to="{path: '/technicians'}">Elenco tecnici</router-link>
      <button v-if="this.role === 'ADMIN'" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editPrice">Modifica prezzi orari tecnici</button>
      <ModalAddTechnician></ModalAddTechnician>
      <ModalEditPricePerHourTechnicians></ModalEditPricePerHourTechnicians>
    </div>
  </div>
</template>

<style scoped>
  .home-container {
    background-color: #8ECAE6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: calc(100vh - 60px);
    width: 100%;
    font-family: Overpass, sans-serif;
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .btn {
    margin: 0.5rem 1rem;
    width: 15rem;
  }

  h2 {
    margin-top: 1rem;
  }
</style>