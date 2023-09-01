<script>
import Header from "@/components/Header.vue";
import ClientsList from "@/components/clients/ClientsList.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "ClientsPage",
  data() {
    return {
    }
  },
  components: {ClientsList, Header},
  mounted() {
  }
})
</script>

<template>
  <Header></Header>
  <h1>Clienti</h1>
  <ClientsList></ClientsList>
</template>

<style scoped>
@import url('../../templates/style.css');
</style>