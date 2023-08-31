<script>
import {defineComponent} from 'vue'
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "NotAuthorized",
  components: {Header}
});
</script>

<template>
  <Header></Header>
  <div class="container">
    <h1>Error 401: Unauthorized</h1>
    <router-link to="/" class="btn btn-primary">Torna alla home</router-link>
  </div>
</template>

<style scoped>
@import url('../../templates/style.css');

.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>