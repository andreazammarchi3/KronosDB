<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";

export default defineComponent({
  name: "TicketDetails",
  props: ['ticket'],
  data() {
    return {
      completed: false,
      technician: null
    }
  },
  methods: {
    checkIfTicketIsCompleted() {
      if (this.ticket.closeDate !== '') {
        this.completed = true
      }
    },
    getTechnician() {
      axios.get(BASE_URL + '/technicians:' + this.ticket.idTechnician)
        .then(response => {
          if (response.data === null) {
            this.technician = 'Nessuno'
          } else {
            this.technician = response.data.fullName
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.checkIfTicketIsCompleted()
    this.getTechnician()
  }
})
</script>

<template>
  <div class="card mb-3">
    <div class="card-header">
      <h3><strong>ID</strong>: {{ this.ticket.idTicket }}</h3>
      <h3>{{ this.ticket.openDate }}</h3>
    </div>
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><h4><strong>Cliente</strong>: {{ this.ticket.idClient }} - {{ this.ticket.fullNameClient }}</h4></li>
        <li class="list-group-item"><strong>Tecnico assegnato</strong>: {{ this.technician }}</li>
        <li class="list-group-item"><strong>Richiesta</strong>: {{ this.ticket.clientRequest }}</li>
        <li class="list-group-item"><strong>Lavoro svolto</strong>: {{ this.ticket.workDone }}</li>
        <li class="list-group-item"><strong>Log attività</strong>:
          <textarea class="form-control" id="log-activities" rows="3" readonly="">{{ this.ticket.logActivities }}</textarea>
        </li>
        <li class="list-group-item"><strong>Ore intervento</strong>: {{ this.ticket.workingHours }}</li>
        <li class="list-group-item"><strong>Ore trasferimento</strong>: {{ this.ticket.transferHours }}</li>
        <li class="list-group-item"><strong>Saldo</strong>: €{{ this.ticket.price }}</li>
      </ul>
    </div>
    <div class="card-footer text-muted">
      <div><strong>Data chiusura</strong>: {{ this.ticket.closeDate }}</div>
      <button type="button" class="btn btn-primary btn-sm" @click="$emit('close')">Chiudi</button>
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
</style>