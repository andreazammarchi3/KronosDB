<script>
import {defineComponent} from 'vue'

import Header from "@/components/Header.vue";
import UpdateTicket from "@/components/tickets/UpdateTicket.vue";

export default defineComponent({
  name: "UpdateTicketPage",
  components: {UpdateTicket, Header}
})
</script>

<template>
  <Header></Header>
  <h1 class="h1">Modifica Ticket</h1>
  <UpdateTicket></UpdateTicket>
</template>

<style scoped>
@import url('../../templates/style.css');
.h1 {
  text-align: center;
}
</style>