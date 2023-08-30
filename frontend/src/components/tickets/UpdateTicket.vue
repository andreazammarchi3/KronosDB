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
    updateTicket(event) {
      if (event) {
        event.preventDefault();
      }

      const openDate = document.getElementById('openDate').value
      const closeDate = document.getElementById('closeDate').value
      const idClient = this.ticket.idClient
      const idTechnician = document.getElementById('technician').value.split(' - ')[0]
      const clientRequest = document.getElementById('clientRequest').value
      const workDone = document.getElementById('workDone').value
      const logActivities = document.getElementById('logActivities').value
      const workingHours = document.getElementById('workingHours').value
      const transferHours = document.getElementById('transferHours').value
      const paymentMethod = document.getElementById('paymentMethod').value
      const price = document.getElementById('price').value

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
        signatureClient: this.ticket.signatureClient
      })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
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
      this.updateTicket()
    },
    deleteSignature() {
      this.ticket.signatureClient = null;
      this.showSignaturePad = true;
      this.updateTicket()
    },
  },
  computed: {
    totalHours() {
      return this.workingHours + this.transferHours
    },
  },
  mounted() {
    this.getAllTechnicians()

  },

  // TODO: add select card option + correct update of card when saving ticket
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
      <input type="number" class="form-control" id="workingHours" v-model="this.workingHours">
      <label for="transferHours" class="form-label mt-4">Ore trasferimento</label>
      <input type="number" class="form-control" id="transferHours" v-model="this.transferHours">
      <label for="totalHours" class="form-label mt-4">Ore totali</label>
      <input type="number" class="form-control" id="totalHours" v-model="this.totalHours" readonly>

      <label for="paymentMethod" class="form-label mt-4">Metodo di pagamento</label>
      <select class="form-select" id="paymentMethod" v-model="this.paymentMethod">
        <option value="TESSERA">TESSERA</option>
        <option value="SALDO">SALDO</option>
        <option value="TESSERA + SALDO">TESSERA + SALDO</option>
      </select>

      <label for="price" class="form-label mt-4">Saldo (€)</label>
      <input :disabled="this.paymentMethod === 'TESSERA'" type="number" class="form-control" step="0.05" id="price" :value="this.ticket.price === null ? 0 : this.ticket.price.toFixed(2)">
      <!-- <small id="priceComputed" class="form-text text-muted">Prezzo calcolato in base alle ore: €{{ this.priceSuggested.toFixed(2) }}</small> -->
    </fieldset>
    <button type="submit" class="btn btn-primary btn-sm">Salva modifiche</button>
    <router-link type="button" class="btn btn-secondary btn-sm" to="/tickets">Indietro</router-link>
  </form>

  <div class="signature-container">
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
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

.form {
  margin: 0 2rem;
}

.signature-container {
  margin: 0 2rem 2rem;
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
</style>