<script>
import {defineComponent} from "vue";
import ModalAddTicket from "@/components/home/ModalAddTicket.vue";
import ModalAddClient from "@/components/home/ModalAddClient.vue";

export default defineComponent({
  name: "HomeContainer",
  components: {ModalAddTicket, ModalAddClient},
  data() {
    return {
    };
  }
})

// TODO: Add technicians
</script>

<template>
    <div class="btn-container">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTicket">Nuovo Ticket</button>
      <router-link class="btn btn-primary" :to="{path: '/tickets'}">Elenco Ticket</router-link>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addClient">Nuovo Cliente</button>
      <router-link class="btn btn-primary" :to="{path: '/clients'}">Elenco clienti</router-link>

      <ModalAddTicket></ModalAddTicket>
      <ModalAddClient></ModalAddClient>
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
</style>
