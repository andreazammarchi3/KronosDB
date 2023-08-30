<script>
import {defineComponent} from 'vue'

import Header from "@/components/Header.vue";
import UpdateTicket from "@/components/tickets/UpdateTicket.vue";
import axios from "axios";
import {BASE_URL} from "@/main";

export default defineComponent({
  name: "UpdateTicketPage",
  components: {UpdateTicket, Header},
  data() {
    return {
      ticket: null,
      client: null,
      technician: null
    }
  },
  methods: {
    async getTicket() {
      try {
        const response = await axios.get(`${BASE_URL}/getTicket:${this.$route.params.id}`);
        this.ticket = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getClient() {
      try {
        const response = await axios.get(`${BASE_URL}/getClient:${this.ticket.idClient}`);
        this.client = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getTechnician() {
      try {
        const response = await axios.get(`${BASE_URL}/getTechnician:${this.ticket.idTechnician}`);
        this.technician = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    await this.getTicket();
    await this.getClient();
  }
})
</script>

<template>
  <Header></Header>
  <h1 class="h1">Modifica Ticket</h1>
  <UpdateTicket v-if="ticket" :ticket="this.ticket" :client="this.client" :technician="this.technician"></UpdateTicket>
</template>

<style scoped>
@import url('../../templates/style.css');
</style>