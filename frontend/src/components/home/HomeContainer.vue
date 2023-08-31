<script>
import {defineComponent} from "vue";
import ModalAddTicket from "@/components/tickets/ModalAddTicket.vue";
import ModalAddClient from "@/components/clients/ModalAddClient.vue";
import ModalAddTechnician from "@/components/technicians/ModalAddTechnician.vue";

export default defineComponent({
  name: "HomeContainer",
  components: {ModalAddTechnician, ModalAddTicket, ModalAddClient},
  data() {
    return {
    };
  }
})

</script>

<template>
    <div class="btn-container">
      <h2>Tickets</h2>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTicket">Nuovo Ticket</button>
      <router-link class="btn btn-primary" :to="{path: '/tickets'}">Elenco Ticket</router-link>
      <h2>Clienti</h2>
      <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#addClient">Nuovo Cliente</button>
      <router-link class="btn btn-warning" :to="{path: '/clients'}">Elenco clienti</router-link>
      <h2>Tecnici</h2>
      <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addTechnician">Nuovo Tecnico</button>
      <router-link class="btn btn-info" :to="{path: '/technicians'}">Elenco tecnici</router-link>

      <ModalAddTicket></ModalAddTicket>
      <ModalAddClient></ModalAddClient>
      <ModalAddTechnician></ModalAddTechnician>
    </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
}

.btn {
  margin: 0.5rem 1rem;
  width: 15rem;
}

h2 {
  margin-top: 1rem;
}
</style>
