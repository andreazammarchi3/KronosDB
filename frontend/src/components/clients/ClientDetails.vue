<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";

export default defineComponent({
  name: "ClientsDetails",
  props: ['client'],
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  }
})

</script>

<template>
  <div class="card mb-3">
    <div class="card-header"><h3><strong>Nome</strong>: {{ this.client.fullName }}</h3></div>
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><h4><strong>ID</strong>: {{ this.client.idClient }}</h4></li>
        <li class="list-group-item"><strong>Telefono</strong>: {{ this.client.cellphone }}</li>
        <li class="list-group-item"><strong>Mail</strong>: {{ this.client.mail }}</li>
        <li class="list-group-item"><strong>Indirizzo</strong>: {{ this.client.address }}</li>
      </ul>
    </div>
    <div class="card-footer text-muted">
      <span></span>
      <div>
        <router-link type="button" class="btn btn-warning btn-sm" :to="{path: '/clients/' + this.client.idClient}">Modifica</router-link>
        <button type="button" class="btn btn-primary btn-sm" @click="$emit('close')">Chiudi</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

.card-header {
  display: flex;
  justify-content: space-between;
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.card-footer button {
  margin: 0 0.5rem;
}
</style>