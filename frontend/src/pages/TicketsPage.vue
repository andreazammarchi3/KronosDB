<script>
import {defineComponent} from 'vue'

import Header from "@/components/Header.vue";
import TicketsList from "@/components/tickets/TicketsList.vue";

export default defineComponent({
  name: "TicketPage",
  components: {TicketsList, Header}
})
</script>

<template>
  <Header></Header>
  <h1 class="h1">Elenco Tickets</h1>
  <TicketsList></TicketsList>
</template>

<style scoped>
@import url('../../templates/style.css');
.h1 {
  text-align: center;
}
</style>