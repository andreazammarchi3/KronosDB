<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";

export default defineComponent({
  name: "UpdateTicket",
  props: ['ticket'],
  data() {
    return {
      technicians: [],
      workingHours: this.ticket.workingHours,
      transferHours: this.ticket.transferHours,
      technician: null
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
    getTechnician() {
      axios.get(BASE_URL + '/getTechnician:' + this.ticket.idTechnician)
        .then(response => {
          this.technician = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    totalHours() {
      return this.workingHours + this.transferHours
    },
    price() {
      if (this.technician) {
        return this.totalHours * this.technician.costPerHour
      } else {
        return 0
      }
    },
    priceComputed() {
      return this.totalHours * this.technician.costPerHour
    }
  },
  mounted() {
    this.getAllTechnicians()
    this.getTechnician()
  }

  // TODO: add cards
  // TODO: add ore residue
  // TODO: add signature
})
</script>

<template>
  <form class="form">
    <fieldset>
      <label for="idTicket" class="form-label mt-4">ID Ticket</label>
      <input type="text" class="form-control" id="idTicket" :placeholder="this.ticket.idTicket" readonly>
      <label for="openDate" class="form-label mt-4">Data apertura</label>
      <input type="text" class="form-control" id="openDate" :value="this.ticket.openDate">
      <label for="closeDate" class="form-label mt-4">Data chiusura</label>
      <input type="text" class="form-control" id="closeDate" :value="this.ticket.closeDate">
      <label for="client" class="form-label mt-4">Cliente</label>
      <input type="text" class="form-control" id="client" :placeholder="this.ticket.idClient + ' - ' + this.ticket.fullNameClient" readonly>
      <label for="technician" class="form-label mt-4">Tecnico assegnato</label>
      <select class="form-select" id="technician">
        <option v-for="technician in technicians" :value="technician.idTechnician" :selected="technician.idTechnician === this.ticket.idTechnician">
          {{ technician.idTechnician + ' - ' + technician.fullName }}
          {{ technician.idTechnician === this.ticket.idTechnician ? ' (attuale)' : '' }}
        </option>
      </select>
      <label for="clientRequest" class="form-label mt-4">Richiesta del cliente</label>
      <textarea class="form-control" id="clientRequest" rows="3">{{ this.ticket.clientRequest }}</textarea>
      <label for="workDone" class="form-label mt-4">Lavoro svolto</label>
      <textarea class="form-control" id="workDone" rows="3">{{ this.ticket.workDone }}</textarea>
      <label for="logActivities" class="form-label mt-4">Log attività</label>
      <textarea class="form-control" id="logActivities" rows="3">{{ this.ticket.logActivities }}</textarea>
      <label for="workingHours" class="form-label mt-4">Ore intervento</label>
      <input type="number" class="form-control" id="workingHours" v-model="this.workingHours">
      <label for="transferHours" class="form-label mt-4">Ore trasferimento</label>
      <input type="number" class="form-control" id="transferHours" v-model="this.transferHours">
      <label for="totalHours" class="form-label mt-4">Ore totali</label>
      <input type="number" class="form-control" id="totalHours" v-model="this.totalHours" readonly>
      <label for="price" class="form-label mt-4">Saldo (€)</label>
      <input type="number" class="form-control" step="0.05" id="price" :value="this.ticket.price.toFixed(2)">
      <small id="priceComputed" class="form-text text-muted" v-if="this.technician">Prezzo calcolato in base alle ore: €{{ this.price.toFixed(2) }}</small>
    </fieldset>
    <button type="submit" class="btn btn-primary btn-sm">Salva modifiche</button>
    <router-link type="button" class="btn btn-secondary btn-sm" to="/tickets">Indietro</router-link>
  </form>
</template>

<style scoped>
@import url('../../../templates/style.css');

.form {
  margin: 0 2rem 2rem;
}

.form-label, .form-select, .form-control {
  padding: 0;
}

.btn {
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
}
</style>