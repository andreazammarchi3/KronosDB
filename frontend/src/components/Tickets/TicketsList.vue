<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";
import TicketCard from "@/components/tickets/TicketCard.vue";

export default defineComponent({
  name: "TicketsList",
  components: {TicketCard},
  data() {
    return {
      BASE_URL: BASE_URL,
      tickets: []
    }
  },
  methods: {
    getTickets() {
      axios.get(`${BASE_URL}/allTickets`).then(response => {
        this.tickets = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getTickets()
  }
})
</script>

<template>
  <div v-for="ticket in tickets">
    <TicketCard :ticket="ticket"></TicketCard>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');
</style>
