<script>
import { defineComponent } from "vue";
import ClientCardsTable from "@/components/clients/ClientCardsTable.vue";

export default defineComponent({
  name: "ClientsDetails",
  components: {ClientCardsTable},
  props: ["client"],
  data() {
    return {
      role: null,
    };
  },
  methods: {
  },
  computed: {
  },
  mounted() {
    this.role = sessionStorage.getItem('role');
  }
});
</script>

<template>
  <div class="card">
    <div class="card-header"><h3><strong>Nome</strong>: {{ this.client.fullName }}</h3></div>
    <div class="card-body">
      <h4>Dettagli</h4>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>ID</strong>: {{ this.client.idClient }}</li>
        <li class="list-group-item"><strong>Telefono</strong>: {{ this.client.cellphone }}</li>
        <li class="list-group-item"><strong>Mail</strong>: {{ this.client.mail }}</li>
        <li class="list-group-item"><strong>Indirizzo</strong>: {{ this.client.address }}</li>
      </ul>

      <h4>Tessere</h4>
      <ClientCardsTable :client="client" ></ClientCardsTable>
    </div>
    <div class="card-footer text-muted">
        <router-link type="button" class="btn btn-primary" :to="{path: '/clients/' + this.client.idClient}">Modifica</router-link>
        <button type="button" class="btn btn-secondary" @click="$emit('close')">Chiudi</button>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

.card {
  color: #023047;
  max-height: 80%;
  overflow-y: auto;
  padding: 0;
  margin: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 0;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
}

h3 {
  margin: 0;
}

h4 {
  margin: 0;
  padding: 0;
}

.btn-primary, .btn-secondary {
  margin-top: 10px;
  margin-bottom: 10px;
}

.btn-secondary {
  margin-right: 15px;
}

</style>