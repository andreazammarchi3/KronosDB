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
  <TicketsList></TicketsList>
</template>

<style scoped>

</style>