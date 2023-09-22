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
      editingCard: null,
      addingCard: false,
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
    getBiggestCardNumber() {
      let biggestNumber = 0;
      this.client.cards.forEach(card => {
        if (card.number > biggestNumber) {
          biggestNumber = parseInt(card.number);
        }
      });
      return biggestNumber + 1;
    }
  },
  methods: {
    editCard(card) {
      if (this.editingCard) {
        this.saveCardEdit(card);
      } else {
        this.editingCard = card.number;
      }
    },
    saveCardEdit(card) {
      this.cancelCardEdit();

      const cards = this.client.cards.filter(c => c.number !== card.number);
      cards.push({
        number: card.number,
        totalHours: card.totalHours,
        usedHours: card.usedHours,
      });
      this.updateClientCards(cards);
    },
    cancelCardEdit() {
      this.editingCard = null;
    },
    deleteCard(number) {
      this.client.cards = this.client.cards.filter(c => c.number !== number);
      this.updateClientCards(this.client.cards);
    },
    updateClientCards(cards) {
      axios.post(BASE_URL + '/updateClientCards:' + this.client.idClient, {
        cards: cards,
      })
          .then(response => {
            console.log(response)
            // this.$router.push('/clients')
          })
          .catch(error => {
            console.log(error)
          });
    },
    addCard() {
      if (this.addingCard) {
        this.addingCard = false;
        const newCard = {
          number: document.getElementById('number').value,
          totalHours: document.getElementById('totalHours').value,
          usedHours: document.getElementById('usedHours').value
        };
        if (newCard.totalHours !== null && newCard.totalHours !== 0) {
          if (newCard.usedHours === null) {
            newCard.usedHours = 0;
          }
          this.client.cards.push(newCard);
          this.updateClientCards(this.client.cards)
        }
      } else {
        this.addingCard = true;
      }
    },
  },
});

</script>

<template>
  <div class="d-flex justify-content-between flex-wrap align-items-center">
    <div class="form-check form-switch align-items-center" v-if="client.cards.length !== 0">
      <input class="form-check-input" type="checkbox" :id="'showUncompletedCards-' + this.client.idClient" v-model="showUncompleted">
      <label class="form-check-label" :for="'showUncompletedCards-' + this.client.idClient">
        Mostra tessere completate
      </label>
    </div>
    <button class="btn margin-btn" :class="addingCard ? 'btn-success' : 'btn-primary'" @click="addCard" title="Nuova tessera">+</button>

    <div class="card-adder" v-if="addingCard">
      <input class="form-control" type="number" :value="getBiggestCardNumber" readonly id="number">
      <input class="form-control" type="number" placeholder="Ore totali" id="totalHours">
      <input class="form-control" type="number" placeholder="Ore utilizzate" id="usedHours">
    </div>

  </div>
  <table class="table" v-if="client.cards.length !== 0" style="max-height: 250px; overflow-y: auto;">
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
    <tr v-for="card in filteredCards" class="align-middle">
      <td class="text-center">{{ card.number }}</td>
      <td class="text-center">{{ card.totalHours }}</td>
      <td class="text-center">
        <span v-if="editingCard !== card.number">{{ card.usedHours }}</span>
        <span v-else>
    <input class="form-control" type="number" v-model="card.usedHours">
  </span>
      </td>
      <td class="text-center">
        <button class="btn" :class="editingCard === card.number ? 'btn-success' : 'btn-primary'" @click="editCard(card)" :title="editingCard ? 'Applica' : 'Modifica'">
          <i v-if="editingCard !== card.number" class="bi bi-pencil"></i>
          <i v-else class="bi bi-check-circle"></i>
        </button>
      </td>
      <td class="text-center">
        <button class="btn btn-danger" @click="deleteCard(card.number)" title="Elimina">
          <i class="bi bi-x-lg"></i>
        </button>
      </td>
    </tr>

    </tbody>
  </table>
</template>

<style scoped>
@import url('../../../templates/style.css');

.arrow-up::before {
  content: " ▲";
}

.arrow-down::before {
  content: " ▼";
}

.th {
  cursor: pointer;
  width: 20%;
  color: #023047;
}

.table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin-bottom: 0;
  color: #023047;
}

.table-body {
  width: 100%;
}

.card-adder {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 5px;
}

.margin-btn {
  margin-bottom: 10px !important;
  margin-right: 0 !important;
}

.btn {
  width: 30px !important;
  height: 30px !important;
  padding: 5px !important;
}

</style>