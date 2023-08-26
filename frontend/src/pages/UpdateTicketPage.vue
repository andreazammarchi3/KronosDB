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
  <UpdateTicket></UpdateTicket>
</template>

<style scoped>

</style>