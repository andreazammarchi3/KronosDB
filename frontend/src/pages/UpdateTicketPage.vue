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
      ticket: null
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
    }
  },
  async mounted() {
    await this.getTicket();
  }
})
</script>

<template>
  <Header></Header>
  <h1 class="h1">Modifica Ticket</h1>
  <UpdateTicket v-if="ticket" :ticket="this.ticket"></UpdateTicket>
</template>

<style scoped>
@import url('../../templates/style.css');
.h1 {
  text-align: center;
}
</style>