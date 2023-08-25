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
    <div class="btn-container">
      <router-link class="btn btn-warning btn-with-margin" :to="{path: '/'}">Nuovo Ticket</router-link>
      <router-link class="btn btn-warning btn-with-margin" :to="{path: '/'}">Elenco Ticket</router-link>
    </div>
</template>

<style scoped>
@import url('../../templates/style.css');

.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.btn-with-margin {
  margin: 0.5rem 1rem;
}

</style>
