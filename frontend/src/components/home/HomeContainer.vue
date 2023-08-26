<script>
import {defineComponent} from "vue";
import ModalAddTicket from "@/components/home/ModalAddTicket.vue";

export default defineComponent({
  name: "HomeContainer",
  components: {ModalAddTicket},
  data() {
    return {
      showModal: false
    };
  }
})
</script>

<template>
    <div class="btn-container">
      <button class="btn btn-warning btn-with-margin" data-bs-toggle="modal" data-bs-target="#modalExample">Nuovo Ticket</button>
      <router-link class="btn btn-warning btn-with-margin" :to="{path: '/tickets'}">Elenco Ticket</router-link>

      <ModalAddTicket></ModalAddTicket>
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

.btn-with-margin {
  margin: 0.5rem 1rem;
}
</style>
