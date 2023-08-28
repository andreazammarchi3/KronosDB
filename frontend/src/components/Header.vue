<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Header"
})
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{path: '/'}">KronosDB</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link active" :to="{path: '/'}">Home
              <span class="visually-hidden">(current)</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import url('../../templates/style.css');
</style>