<script>
import { defineComponent } from "vue";
import ClientCardsTable from "@/components/clients/ClientCardsTable.vue";

export default defineComponent({
  name: "ClientsDetails",
  components: {ClientCardsTable},
  props: ["client"],
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
  },
});
</script>

<template>
  <div class="card mb-3">
    <div class="card-header"><h3><strong>Nome</strong>: {{ this.client.fullName }}</h3></div>
    <div class="card-body">
      <h4 class="mt-3">Dettagli</h4>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>ID</strong>: {{ this.client.idClient }}</li>
        <li class="list-group-item"><strong>Telefono</strong>: {{ this.client.cellphone }}</li>
        <li class="list-group-item"><strong>Mail</strong>: {{ this.client.mail }}</li>
        <li class="list-group-item"><strong>Indirizzo</strong>: {{ this.client.address }}</li>
      </ul>

      <ClientCardsTable :client="client" ></ClientCardsTable>
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
@import url("../../../templates/style.css");

.card-header {
  display: flex;
  justify-content: space-between;
}

.card-footer {
  display: flex;
  justify-content: center;
}

.card-footer button {
  margin: 0 0.5rem;
}
</style>