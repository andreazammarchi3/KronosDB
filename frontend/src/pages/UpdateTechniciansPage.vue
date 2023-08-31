<script>
import {defineComponent} from 'vue'

import Header from "@/components/Header.vue";
import UpdateTechnician from "@/components/technicians/UpdateTechnician.vue";
import axios from "axios";
import {BASE_URL} from "@/main";

export default defineComponent({
  name: "UpdateTechnicianPage",
  components: {UpdateTechnician, Header},
  data() {
    return {
      technician: null
    }
  },
  methods: {
    async getTechnician() {
      try {
        const response = await axios.get(`${BASE_URL}/getTechnician:${this.$route.params.id}`);
        this.technician = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    const role = sessionStorage.getItem('role');
    if (role === 'BASE' || role === 'JUNIOR' || role === 'SENIOR') this.$router.push('/401');
    await this.getTechnician();
  }
})
</script>

<template>
  <Header></Header>
  <h1>Modifica Tecnico</h1>
  <UpdateTechnician v-if="technician" :technician="this.technician"></UpdateTechnician>
</template>

<style scoped>
@import url('../../templates/style.css');
</style>