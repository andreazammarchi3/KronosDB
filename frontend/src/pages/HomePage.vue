<script>
import {defineComponent} from 'vue'
import HomeContainer from "@/components/HomeContainer.vue";
import Header from "@/components/Header.vue";

export default defineComponent({
    name: "HomePage",
    components: {Header, HomeContainer}
})
</script>

<template>
  <Header></Header>
  <HomeContainer></HomeContainer>
</template>

<style scoped>

</style>