<script>
import {defineComponent} from 'vue'
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "NotFound",
  components: {Header}
});
</script>

<template>
  <Header></Header>
  <div class="d-flex justify-content-center">
    <h1>Error 404: Page not found</h1>
  </div>
</template>

<style scoped>

</style>