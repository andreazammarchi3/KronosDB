<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";

export default defineComponent({
  name: "HomeContainer",
  data() {
    return {
      BASE_URL: BASE_URL
    }
  }
})
</script>

<template>
    <div class="button-container">
      <router-link class="btn btn-warning" :to="{path: '/'}">Nuovo Ticket</router-link>
      <router-link class="btn btn-warning" :to="{path: '/'}">Elenco Ticket</router-link>
    </div>
</template>

<style scoped>
@import url('../../templates/style.css');
</style>
