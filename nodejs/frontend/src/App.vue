<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App"
});
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>
@font-face {
  font-family: "Overpass";
  src: local("Overpass"), url("@/assets/fonts/Overpass/Overpass-Regular.ttf") format("truetype");
}
</style>
