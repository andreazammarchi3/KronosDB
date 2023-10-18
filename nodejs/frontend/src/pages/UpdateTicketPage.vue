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
      technicians: [],
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
  },
  async mounted() {
    const role = sessionStorage.getItem('role');
    if (role === 'BASE') this.$router.push('/401');
    await this.getTicket();
    await this.getClient();
  }
})
</script>

<template>
  <Header></Header>
  <UpdateTicket v-if="this.ticket" :ticket="this.ticket" :client="this.client"></UpdateTicket>
</template>

<style scoped>
</style>