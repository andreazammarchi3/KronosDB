<script>
import {defineComponent} from "vue";
import Header from "@/components/Header.vue";
import ModalAddTicket from "@/components/tickets/ModalAddTicket.vue";
import ModalAddClient from "@/components/clients/ModalAddClient.vue";
import ModalAddTechnician from "@/components/technicians/ModalAddTechnician.vue";
export default defineComponent({
  name: "HomePage",
  components: {Header, ModalAddTechnician, ModalAddTicket, ModalAddClient},
  data() {
    return {
      admin: false
    };
  },
  mounted() {
    this.admin = sessionStorage.getItem("admin") === "true";
  }
})
</script>

<template>
  <Header></Header>
  <div class="home-container">
    <h1>HOME</h1>
    <div class="btn-container">
      <h2>Tickets</h2>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTicket">Nuovo Ticket</button>
      <router-link class="btn btn-primary" :to="{path: '/tickets'}">Elenco Ticket</router-link>
      <ModalAddTicket></ModalAddTicket>
    </div>
    <div class="btn-container">
      <h2>Clienti</h2>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addClient">Nuovo Cliente</button>
      <router-link class="btn btn-primary" :to="{path: '/clients'}">Elenco clienti</router-link>
      <ModalAddClient></ModalAddClient>
    </div>
    <div class="btn-container">
      <h2>Tecnici</h2>
      <button v-if="this.admin === true" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTechnician">Nuovo Tecnico</button>
      <router-link class="btn btn-primary" :to="{path: '/technicians'}">Elenco tecnici</router-link>
      <ModalAddTechnician></ModalAddTechnician>
    </div>
  </div>
</template>

<style scoped>
@import url('../../templates/style.css');

.home-container {
  background-color: #8ECAE6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100vh - 60px);
  width: 100%;
  font-family: Overpass, sans-serif;
  overflow-y: auto;
}

h2 {
  color: #023047;
  font-weight: bold;
  margin-top: 30px;
}

h2 {
  margin-bottom: 0;
}

.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn {
  width: 300px;
  font-size: 20px;
  margin: 10px;
}

</style>