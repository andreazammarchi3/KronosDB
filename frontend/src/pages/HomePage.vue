<script>
import {defineComponent} from 'vue'
import HomeContainer from "@/components/home/HomeContainer.vue";
import Header from "@/components/Header.vue";

export default defineComponent({
    name: "HomePage",
    components: {Header, HomeContainer}
})
</script>

<template>
  <Header></Header>
  <h1>KronosDB</h1>
  <HomeContainer></HomeContainer>
</template>

<style scoped>
@import url('../../templates/style.css');
</style>