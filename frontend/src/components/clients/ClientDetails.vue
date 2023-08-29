<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClientsDetails",
  props: ["client"],
  data() {
    return {
      sortColumn: "",
      sortDirection: "asc",
      showCompleted: true,
    };
  },
  methods: {},
  computed: {
    sortedCards() {
      if (!this.sortColumn) {
        return this.client.cards;
      }

      return this.client.cards.sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];

        if (aValue < bValue) {
          return this.sortDirection === "asc" ? -1 : 1;
        } else if (aValue > bValue) {
          return this.sortDirection === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      });
    },
    filteredCards() {
      if (this.showCompleted) {
        return this.sortedCards;
      } else {
        return this.sortedCards.filter(card => card.totalHours - card.usedHours <= 0);
      }
    },
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

      <h4 class="mt-3">Tessere</h4>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" :id="'showCompletedCards-' + this.client.idClient" v-model="showCompleted">
        <label class="form-check-label" :for="'showCompletedCards-' + this.client.idClient">
          Mostra tessere completate
        </label>
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="th" @click="sortColumn = 'totalHours'; sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'">
            Ore totali
            <span v-if="sortColumn === 'totalHours'" :class="sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'"></span>
          </th>
          <th class="th" @click="sortColumn = 'usedHours'; sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'">
            Ore utilizzate
            <span v-if="sortColumn === 'usedHours'" :class="sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'"></span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="card in filteredCards" :class="{ 'table-success': card.totalHours - card.usedHours > 0, 'table-danger': card.totalHours - card.usedHours <= 0 }">
          <td>{{ card.totalHours }}</td>
          <td>{{ card.usedHours }}</td>
        </tr>
        </tbody>
      </table>
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

.arrow-up::before {
  content: " ▲";
}

.arrow-down::before {
  content: " ▼";
}

.th {
  cursor: pointer;
  width: 50%;
}

.form-check {
  margin-left: 1rem;
}
</style>