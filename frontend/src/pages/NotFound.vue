<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "NotFound"
});
</script>

<template>
    <div class="d-flex justify-content-center">
        <img class="not-found-img" src="../assets/img/notFound.jpg" />
    </div>
</template>

<style scoped>
.not-found-img{
  width: 50%;
  height: 50%;
}
</style>