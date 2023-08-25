<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";

export default defineComponent({
  name: "TicketCard",
  props: ['ticket'],
  data() {
    return {
      clientFullName: null,
      routeName: "TicketDetails"
    }
  },
  methods: {
    getClientFullName() {
      axios.get(`${BASE_URL}/getClient:${this.ticket.idClient}`).then(response => {
        this.clientFullName = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getClientFullName()
  }
})
</script>

<template>
  <div class="card bg-secondary mb-3" style="max-width: 20rem;">
    <div class="card-header">{{ this.ticket.idTicket }}</div>
    <div class="card-body">
      <h4 class="card-title">{{ this.clientFullName.fullName }}</h4>
      <p class="card-text">{{ this.ticket.clientRequest }}</p>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');
</style>