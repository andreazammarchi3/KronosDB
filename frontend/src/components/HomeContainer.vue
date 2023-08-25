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
      <router-link class="button" :to="{path: '/'}">Nuovo Ticket</router-link>
      <router-link class="button" :to="{path: '/'}">Elenco Ticket</router-link>
    </div>
</template>

<style scoped>
@import url('../../templates/style.css');

a {
  text-decoration: none;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.button {
  margin: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.button:hover {
  background-color: #0069d9;
}
</style>
