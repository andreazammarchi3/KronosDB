<script>
import {defineComponent} from 'vue'

import Header from "@/components/Header.vue";
import UpdateClient from "@/components/clients/UpdateClient.vue";
import axios from "axios";
import {BASE_URL} from "@/main";

export default defineComponent({
  name: "UpdateClientPage",
  components: {UpdateClient, Header},
  data() {
    return {
      client: null
    }
  },
  methods: {
    async getClient() {
      try {
        const response = await axios.get(`${BASE_URL}/getClient:${this.$route.params.id}`);
        this.client = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    const role = sessionStorage.getItem('role');
    if (role === 'BASE') this.$router.push('/401');
    await this.getClient();
  }
})
</script>

<template>
  <Header></Header>
  <h1>Modifica Cliente</h1>
  <UpdateClient v-if="client" :client="this.client"></UpdateClient>
</template>

<style scoped>
@import url('../../templates/style.css');
</style>