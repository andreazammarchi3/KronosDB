<script>
import Header from "@/components/Header.vue";
import TechniciansList from "@/components/technicians/TechniciansList.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "TechniciansPage",
  components: {TechniciansList, Header},
  mounted() {
    const role = sessionStorage.getItem('role');
    if (role === 'BASE') this.$router.push('/401');
  }
})
</script>

<template>
  <Header></Header>
  <h1>Tecnici</h1>
  <TechniciansList></TechniciansList>
</template>

<style scoped>
@import url('../../templates/style.css');
</style>