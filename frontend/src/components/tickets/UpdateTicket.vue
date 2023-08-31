<script>
import {defineComponent} from "vue";
import VueSignaturePad from "./MySignaturePad.vue";
import {BASE_URL} from "@/main";
import axios from "axios";
import TicketDetails from "@/components/tickets/TicketDetails.vue";
import MySignaturePad from "@/components/tickets/MySignaturePad.vue";

export default defineComponent({
  name: "UpdateTicket",
  props: ['ticket', 'client', 'technician'],
  components: {MySignaturePad, TicketDetails, VueSignaturePad },
  data() {
    return {
      technicians: [],
      openDate: this.ticket.openDate,
      closeDate: this.ticket.closeDate,
      clientRequest: this.ticket.clientRequest,
      workDone: this.ticket.workDone,
      logActivities: this.ticket.logActivities,
      workingHours: this.ticket.workingHours,
      transferHours: this.ticket.transferHours,
      showSignaturePad: false,
      paymentMethod: this.ticket.paymentMethod,
      cardNumber: this.ticket.cardNumber,
      cardUsedHours: this.ticket.cardUsedHours,
      price: this.ticket.price,
      addingCard: false,
      totalHoursAddingCard: null,
      usedHoursAddingCard: null,
      excessUsedHoursLabel: false
    }
  },
  methods: {
    getAllTechnicians() {
      axios.get(BASE_URL + '/allTechnicians')
        .then(response => {
          this.technicians = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkIfCardUsedHoursAreValid(ticketHours, usedHours, totalHours) {
      return ticketHours + usedHours <= totalHours;
    },
    updateTicket(event) {
      if (event) {
        event.preventDefault();
      }

      const openDate = document.getElementById('openDate').value;
      const closeDate = document.getElementById('closeDate').value;
      const idClient = this.ticket.idClient;
      const idTechnician = document.getElementById('technician').value.split(' - ')[0];
      const clientRequest = document.getElementById('clientRequest').value;
      const workDone = document.getElementById('workDone').value;
      const logActivities = document.getElementById('logActivities').value;
      const workingHours = document.getElementById('workingHours').value;
      const transferHours = document.getElementById('transferHours').value;
      const paymentMethod = document.getElementById('paymentMethod').value;
      let price = null;
      let cardNumber = null;
      let cardUsedHours = null;

      if (paymentMethod === 'TESSERA' || paymentMethod === 'TESSERA + SALDO') {
        cardNumber = document.getElementById('card').value.split(' - ')[0];
        cardUsedHours = this.workingHours + this.transferHours;
      }
      if (paymentMethod === 'SALDO' || paymentMethod === 'TESSERA + SALDO') {
        price = document.getElementById('price').value;
      }

      const card = this.client.cards.find(c => c.number === parseInt(cardNumber));
      console.log(card);
      if (card !== undefined) {
        if (!this.checkIfCardUsedHoursAreValid(cardUsedHours, card.usedHours, card.totalHours)) {
          this.excessUsedHoursLabel = true;
          return;
        } else {
          this.excessUsedHoursLabel = false;
        }
        card.usedHours += cardUsedHours;
        this.client.cards = this.client.cards.filter(c => c.number !== card.number);
        this.client.cards.push(card);
        this.updateClientCards(this.client.cards);
      }

      axios.post(BASE_URL + '/updateTicket:' + this.ticket.idTicket, {
        idTicket: this.ticket.idTicket,
        openDate: openDate,
        closeDate: closeDate,
        idClient: idClient,
        fullNameClient: this.ticket.fullNameClient,
        idTechnician: idTechnician,
        clientRequest: clientRequest,
        workDone: workDone,
        logActivities: logActivities,
        workingHours: workingHours,
        transferHours: transferHours,
        paymentMethod: paymentMethod,
        price: price,
        cardNumber: card === undefined ? null : cardNumber,
        cardUsedHours: card === undefined ? null : card.usedHours,
        signatureClient: this.ticket.signatureClient
      }).then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
    },
    dataURLtoFile(dataurl) {
      if (dataurl === null) {
        return null
      } else if (typeof dataurl === 'string') {
        return dataurl;
      } else {
        return null;
      }
    },
    saveSignature(data) {
      this.ticket.signatureClient = data
      this.showSignaturePad = false;
    },
    deleteSignature() {
      this.ticket.signatureClient = null;
      this.showSignaturePad = true;
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
          number: document.getElementById('numberAddingCard').value,
          totalHours: document.getElementById('totalHoursAddingCard').value,
          usedHours: 0,
        };
        if (newCard.totalHours !== '') {
          this.client.cards.push(newCard);
          this.updateClientCards(this.client.cards)
        }
      } else {
        this.addingCard = true;
      }
    },
  },
  computed: {
    validCards() {
      return this.client.cards.filter(card => card.totalHours - card.usedHours > 0);
    },
    getBiggestCardNumber() {
      let biggestNumber = 0;
      this.client.cards.forEach(card => {
        if (card.number > biggestNumber) {
          biggestNumber = parseInt(card.number);
        }
      });
      return biggestNumber + 1;
    },
  },
  mounted() {
    this.getAllTechnicians()
  },
})
</script>

<template>
  <form class="form" @submit="updateTicket($event)" v-if="this.client">
    <fieldset>
      <label for="idTicket" class="form-label mt-4">ID Ticket</label>
      <input type="text" class="form-control" id="idTicket" :placeholder="this.ticket.idTicket" readonly>
      <label for="openDate" class="form-label mt-4">Data apertura</label>
      <input type="text" class="form-control" id="openDate" v-model="this.openDate">
      <label for="closeDate" class="form-label mt-4">Data chiusura</label>
      <input type="text" class="form-control" id="closeDate" v-model="this.closeDate">
      <label for="client" class="form-label mt-4">Cliente</label>
      <input type="text" class="form-control" id="client" :placeholder="this.ticket.idClient + ' - ' + this.client.fullName" readonly>

      <label for="technician" class="form-label mt-4">Tecnico assegnato</label>
      <select class="form-select" id="technician">
        <option v-for="technician in technicians" :value="technician.idTechnician" :selected="technician.idTechnician === this.ticket.idTechnician">
          {{ technician.idTechnician + ' - ' + technician.fullName }}
          {{ technician.idTechnician === this.ticket.idTechnician ? ' (attuale)' : '' }}
        </option>
      </select>

      <label for="clientRequest" class="form-label mt-4">Richiesta del cliente</label>
      <textarea class="form-control" id="clientRequest" rows="3" v-model="this.clientRequest"></textarea>
      <label for="workDone" class="form-label mt-4">Lavoro svolto</label>
      <textarea class="form-control" id="workDone" rows="3" v-model="this.workDone"></textarea>
      <label for="logActivities" class="form-label mt-4">Log attività</label>
      <textarea class="form-control" id="logActivities" rows="3" v-model="this.logActivities"></textarea>
      <label for="workingHours" class="form-label mt-4">Ore intervento</label>
      <input type="number" class="form-control" id="workingHours" v-model="this.workingHours" min="0">
      <label for="transferHours" class="form-label mt-4">Ore trasferimento</label>
      <input type="number" class="form-control" id="transferHours" v-model="this.transferHours" min="0">

      <label for="paymentMethod" class="form-label mt-4">Metodo di pagamento</label>
      <select class="form-select" id="paymentMethod" v-model="this.paymentMethod">
        <option value="NON PAGATO">NON PAGATO</option>
        <option value="TESSERA">TESSERA</option>
        <option value="SALDO">SALDO</option>
        <option value="TESSERA + SALDO">TESSERA + SALDO</option>
      </select>

      <div v-if="this.paymentMethod === 'TESSERA' || this.paymentMethod === 'TESSERA + SALDO'" class="form-group">
        <label for="card" class="form-label mt-4">Tessera</label>
        <button type="button" class="btn btn-sm margin-btn" :class="addingCard ? 'btn-success' : 'btn-primary'" @click="addCard">{{ addingCard ? 'Aggiungi tessera' : 'Nuova tessera' }}</button>
        <div class="card-adder" v-if="addingCard">
          <input class="form-control" type="number" :value="getBiggestCardNumber" readonly id="numberAddingCard">
          <input class="form-control" type="number" placeholder="Ore totali" v-model="totalHoursAddingCard" id="totalHoursAddingCard" min="0"></div>
        <select class="form-select" id="card">
          <option v-for="card in validCards" v-if="validCards.length > 0">
            {{ card.number }} - Ore totali: {{ card.totalHours }} - Ore usate: {{ card.usedHours }}
          </option>
          <option v-if="validCards.length === 0" disabled  selected>Nessuna tessera valida</option>
        </select>
        <small v-if="this.excessUsedHoursLabel" id="excessUsedHours" class="form-text text-danger">Le ore totali di intervento superano le ore utilizzabili per la tessera selezionata</small>
      </div>

      <label v-if="this.paymentMethod === 'SALDO' || this.paymentMethod === 'TESSERA + SALDO'" for="price" class="form-label mt-4">Saldo (€)</label>
      <input v-if="this.paymentMethod === 'SALDO' || this.paymentMethod === 'TESSERA + SALDO'" type="number" class="form-control" step="0.05" id="price" v-model="this.price" min="0">
      <!-- <small id="priceComputed" class="form-text text-muted">Prezzo calcolato in base alle ore: €{{ this.priceSuggested.toFixed(2) }}</small> -->

      <div class="form-group" v-if="this.ticket.signatureClient">
        <label class="form-label mt-4">Firma del cliente</label>
        <div class="form-group">
          <img class="figure-img" v-if="this.ticket.signatureClient" :src="dataURLtoFile(this.ticket.signatureClient, 'signature.png')" alt="Client signature"/>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" @click="deleteSignature">Cancella firma</button>
      </div>

      <div class="form-group" v-if="!ticket.signatureClient || showSignaturePad">
        <MySignaturePad @save="saveSignature"/>
      </div>
    </fieldset>
    <button type="submit" class="btn btn-primary btn-sm">Salva modifiche</button>
    <router-link type="button" class="btn btn-secondary btn-sm" to="/tickets">Indietro</router-link>
  </form>
</template>

<style scoped>
@import url('../../../templates/style.css');

.form {
  margin: 0 5%;
}

.form-label, .form-select, .form-control {
  padding: 0;
}

.btn {
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
}

.figure-img {
  width: auto;
  height: 100px;
  border: 1px solid #000;
  margin: 0 auto;
}

.card-adder .form-control {
  padding-bottom: 0.5rem
}

.margin-btn {
  margin-left: 1rem;
}

.card-adder {
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #000;
}
</style>