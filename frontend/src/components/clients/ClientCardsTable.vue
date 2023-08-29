<script>
import { defineComponent } from "vue";
import axios from "axios";
import {BASE_URL} from "@/main";

export default defineComponent({
  name: "ClientCardsTable",
  props: ["client"],
  data() {
    return {
      sortColumn: "",
      sortDirection: "asc",
      showUncompleted: true,
    }
  },
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
      if (this.showUncompleted) {
        return this.sortedCards;
      } else {
        return this.sortedCards.filter(card => card.totalHours - card.usedHours > 0);
      }
    },
  },
  methods: {
    editCard(card) {
      // show a modal with the card form

    },
    deleteCard(number) {
      this.client.cards = this.client.cards.filter(c => c.number !== number);
      axios.post(BASE_URL + '/updateClientCards:' + this.client.idClient, {
        cards: this.client.cards,
      })
          .then(response => {
            console.log(response)
            this.$router.push('/clients')
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
});

</script>

<template>
  <h4 class="mt-3">Tessere</h4>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" :id="'showUncompletedCards-' + this.client.idClient" v-model="showUncompleted">
    <label class="form-check-label" :for="'showUncompletedCards-' + this.client.idClient">
      Mostra tessere completate
    </label>
  </div>
  <div class="table-container" style="max-height: 15rem; overflow-y: auto;">
    <table class="table">
      <thead>
      <tr>
        <th class="th text-center" @click="sortColumn = 'number'; sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'">
          Numero tessera
          <span v-if="sortColumn === 'totalHours'" :class="sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'"></span>
        </th>
        <th class="th text-center" @click="sortColumn = 'totalHours'; sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'">
          Ore totali
          <span v-if="sortColumn === 'totalHours'" :class="sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'"></span>
        </th>
        <th class="th text-center" @click="sortColumn = 'usedHours'; sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'">
          Ore utilizzate
          <span v-if="sortColumn === 'usedHours'" :class="sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'"></span>
        </th>
        <th class="th text-center"></th>
        <th class="th text-center"></th>
      </tr>
      </thead>
      <tbody class="table-body">
      <tr v-for="card in filteredCards" :class="{ 'table-success': card.totalHours - card.usedHours > 0, 'table-danger': card.totalHours - card.usedHours <= 0 }">
        <td class="text-center">{{ card.number }}</td>
        <td class="text-center">{{ card.totalHours }}</td>
        <td class="text-center">{{ card.usedHours }}</td>
        <td class="text-center"><button class="btn btn-warning btn-sm" @click="editCard(card)" title="Modifica"><i class="bi bi-pencil"></i></button></td>
        <td class="text-center"><button class="btn btn-danger btn-sm" @click="deleteCard(card.number)" title="Elimina"><i class="bi bi-x-lg"></i></button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import url("../../../templates/style.css");

.arrow-up::before {
  content: " ▲";
}

.arrow-down::before {
  content: " ▼";
}

.th {
  cursor: pointer;
  width: 20%;
}

.form-check {
  margin-left: 1rem;
}

.table-container {
  margin-top: 0;
}

.table {
  border: 1px solid #ccc;
  border-collapse: collapse;
}

.table-body {
  width: 100%;
}

</style>