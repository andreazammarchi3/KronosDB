<script>
import {defineComponent} from 'vue'

import Header from "@/components/Header.vue";
import TicketsList from "@/components/tickets/TicketsList.vue";

export default defineComponent({
  name: "TicketsPage",
  components: {TicketsList, Header}
})
</script>

<template>
  <Header></Header>
  <h1>Tickets</h1>
  <TicketsList></TicketsList>
</template>

<style scoped>
</style>