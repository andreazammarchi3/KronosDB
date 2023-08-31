<script>
import {defineComponent} from 'vue'
import Header from "@/components/Header.vue";
import Login from "@/components/home/Login.vue";

export default defineComponent({
  name: "LoginPage",
  components: {Login, Header}
})
</script>

<template>
  <Header></Header>
  <h1>Login</h1>
  <Login></Login>
</template>

<style scoped>
@import url('../../templates/style.css');
</style>