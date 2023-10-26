<script>
import {defineComponent} from "vue";
import VueSignaturePad from "./MySignaturePad.vue";
import {BASE_URL} from "@/main";
import axios from "axios";
import TicketDetails from "@/components/tickets/TicketDetails.vue";
import MySignaturePad from "@/components/tickets/MySignaturePad.vue";
import updateTechnician from "@/components/technicians/UpdateTechnician.vue";

export default defineComponent({
  name: "UpdateTicket",
  props: ['ticket', 'client'],
  components: {MySignaturePad, TicketDetails, VueSignaturePad },
  data() {
    return {
      openDate: this.ticket.openDate,
      closeDate: this.ticket.closeDate,
      clientRequest: this.ticket.clientRequest,
      workDone: this.ticket.workDone,
      logActivities: this.ticket.logActivities,
      workingHours: this.ticket.workingHours,
      transferRange: this.ticket.transferRange,
      showSignaturePad: false,
      paymentMethod: this.ticket.paymentMethod,
      cardNumber: this.ticket.cardNumber,
      cardTotalHours: this.ticket.cardTotalHours,
      cardRemainingHours: this.ticket.cardRemainingHours,
      price: this.ticket.price,
      technicians: [],
      technician: null,
    }
  },
  computed: {
  },
  methods: {
    updateTechnician(technician) {
      this.technician = technician;
    },
    updateTicket(event) {
      if (event) {
        event.preventDefault();
      }

      const openDate = document.getElementById('openDate').value;
      const closeDate = document.getElementById('closeDate').value;
      const idClient = this.ticket.idClient;
      const username = document.getElementById('technician').value;
      const clientRequest = document.getElementById('clientRequest').value;
      const workDone = document.getElementById('workDone').value;
      const logActivities = document.getElementById('logActivities').value;
      const workingHours = document.getElementById('workingHours').value;
      const transferRange = this.transferRange;
      const paymentMethod = document.getElementById('paymentMethod').value;
      const cardNumber = document.getElementById('cardNumber') ? document.getElementById('cardNumber').value : null;
      const cardTotalHours = document.getElementById('cardTotalHours') ? document.getElementById('cardTotalHours').value : null;
      const cardRemainingHours = document.getElementById('cardRemainingHours') ? document.getElementById('cardRemainingHours').value : null;
      let price = null;

      if (paymentMethod === 'SALDO' || paymentMethod === 'TESSERA + SALDO') {
        price = document.getElementById('price').value;
      }

      axios.post(BASE_URL + '/updateTicket:' + this.ticket.idTicket, {
        idTicket: this.ticket.idTicket,
        openDate: openDate,
        closeDate: closeDate,
        idClient: idClient,
        fullNameClient: this.ticket.fullNameClient,
        username: username,
        clientRequest: clientRequest,
        workDone: workDone,
        logActivities: logActivities,
        workingHours: workingHours,
        transferRange: transferRange,
        paymentMethod: paymentMethod,
        price: price,
        cardNumber: cardNumber,
        cardTotalHours: cardTotalHours,
        cardRemainingHours: cardRemainingHours,
        signatureClient: this.ticket.signatureClient
      }).then(response => {
          alert('Ticket modificato con successo');
        }).catch(error => {
          alert(error);
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
  },
  mounted() {
    axios.get(BASE_URL + '/allTechnicians').then(response => {
      this.technicians = response.data;
      this.technician = this.technicians.find(technician => technician.username === this.ticket.username);
    }).catch(error => {
      alert(error);
    })
  },
})
</script>

<template>
  <div class="form-container">
    <h1>MODIFICA TICKET</h1>
    <form class="form" @submit="updateTicket($event)" v-if="this.client">
      <fieldset>
        <label for="idTicket" class="form-label mt-4">ID Ticket</label>
        <input type="text" class="form-control" id="idTicket" :placeholder="this.ticket.idTicket" readonly>
        <label for="openDate" class="form-label mt-4">Data apertura</label>
        <input type="text" class="form-control" id="openDate" v-model="this.openDate">
        <label for="closeDate" class="form-label mt-4">Data chiusura</label>
        <input type="text" class="form-control" id="closeDate" v-model="this.closeDate">
        <label for="client" class="form-label mt-4">Cliente</label>
        <input type="text" class="form-control" id="client" :placeholder="this.ticket.idClient + ' - ' + this.client.society" readonly>

        <label for="technician" class="form-label mt-4">Tecnico assegnato</label>
        <select v-if="this.technicians" class="form-select" id="technician">
          <option :selected="!this.ticket.username">-</option>
          <option v-for="technician in technicians" :value="technician.username" :selected="technician.username === this.ticket.username" @change="this.updateTechnician">
            {{ technician.fullName }}
            {{ technician.username === this.ticket.username ? ' (attuale)' : '' }}
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

        <label class="form-label mt-4">Fascia intervento</label>
        <div class="radio-group">
          <input class="form-check-input" type="radio" id="transferRange0" value="0" v-model="transferRange">
          <label class="form-check-label" for="transferRange0">0</label>
          <input class="form-check-input" type="radio" id="transferRange1" value="1" v-model="transferRange">
          <label class="form-check-label" for="transferRange1">1</label>
          <input class="form-check-input" type="radio" id="transferRange2" value="2" v-model="transferRange">
          <label class="form-check-label" for="transferRange2">2</label>
          <input class="form-check-input" type="radio" id="transferRange3" value="3" v-model="transferRange">
          <label class="form-check-label" for="transferRange3">3</label>
        </div>

        <label for="paymentMethod" class="form-label mt-4">Metodo di pagamento</label>
        <select class="form-select" id="paymentMethod" v-model="this.paymentMethod">
          <option value="NON PAGATO">NON PAGATO</option>
          <option value="TESSERA">TESSERA</option>
          <option value="SALDO">SALDO</option>
          <option value="TESSERA + SALDO">TESSERA + SALDO</option>
        </select>

        <div v-if="this.paymentMethod === 'TESSERA' || this.paymentMethod === 'TESSERA + SALDO'" class="form-group">
          <label for="cardNumber" class="form-label mt-4">Numero tessera</label>
          <input type="number" class="form-control" id="cardNumber" v-model="this.cardNumber">
          <label for="cardTotalHours" class="form-label mt-4">Ore totali tessera</label>
          <input type="number" class="form-control" id="cardTotalHours" v-model="this.cardTotalHours" min="0">
          <label for="cardRemainingHours" class="form-label mt-4">Ore residue tessera</label>
          <input type="number" class="form-control" id="cardRemainingHours" v-model="this.cardRemainingHours" min="0">
        </div>

        <label v-if="this.paymentMethod === 'SALDO' || this.paymentMethod === 'TESSERA + SALDO'" for="price" class="form-label mt-4">Saldo (€)</label>
        <input v-if="this.paymentMethod === 'SALDO' || this.paymentMethod === 'TESSERA + SALDO'" type="number" class="form-control" step="0.05" id="price" v-model="this.price" min="0">
        <!-- <small id="priceComputed" class="form-text text-muted">Prezzo calcolato in base alle ore: €{{ this.priceSuggested.toFixed(2) }}</small> -->

        <div class="form-group" v-if="this.ticket.signatureClient">
          <label class="form-label">Firma del cliente</label>
          <div class="form-group">
            <img class="figure-img bord" v-if="this.ticket.signatureClient" :src="dataURLtoFile(this.ticket.signatureClient, 'signature.png')" alt="Client signature"/>
          </div>
          <button type="button" class="btn btn-second" @click="deleteSignature">Cancella firma</button>
        </div>

        <div class="form-group" v-if="!ticket.signatureClient || showSignaturePad">
          <MySignaturePad @save="saveSignature"/>
        </div>
      </fieldset>
      <button type="submit" class="btn btn-primary marg-btn">Salva modifiche</button>
      <router-link type="button" class="btn btn-second marg-btn" to="/tickets">Indietro</router-link>
    </form>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

h4 {
  margin-top: 20px;
  margin-bottom: 0;
}

h4:first-child {
  margin-top: 0;
  margin-bottom: 10px;
}

.form-container {
  background-color: #8ECAE6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100vh - 60px);
  width: 100%;
  font-family: Overpass, sans-serif;
}

.form {
  background-color: #8ECAE6;
  width: 100%;
  padding-right: 5%;
  padding-left: 5%;
  padding-bottom: 30px;
}

.bord {
  background-color: #FFFFFF;
  border-radius: 10px;
}

.btn {
  margin-left: 0 !important;
  margin-right: 10px !important;
}

.marg-btn {
  margin-top: 20px !important;
}

.btn-second, .btn-second:disabled {
  background-color: #219EBC !important;
  font-weight: bold !important;
}

.btn-second:hover, .btn-second:focus, .btn-second:active {
  background-color: #023047 !important;
  color: #FFFFFF !important;
  font-weight: normal !important;
}

.radio-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.radio-group label {
  margin-right: 15px;
  margin-left: 5px;
}

.radio-group input {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>