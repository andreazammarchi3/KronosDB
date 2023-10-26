<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";

export default defineComponent({
  name: "TicketDetails",
  props: ['ticket', 'client'],
  data() {
    return {
      technicianInfo: null,
      role: null
    }
  },
  methods: {
    deleteTicket() {
      axios.post(BASE_URL + '/removeTicket:' + this.ticket.idTicket)
        .then(() => {
          this.$emit('close')
        })
        .catch(error => {
          alert(error);
        })
    },
    getTechnician() {
      axios.get(BASE_URL + '/getTechnician:' + this.ticket.username)
        .then(response => {
          this.technicianInfo = response.data
        })
        .catch(error => {
          alert(error);
        })
    }
  },
  mounted() {
    this.role = sessionStorage.getItem("role");
    this.getTechnician()
  }
})

// TODO: add share btn for pdf, mail or print
</script>

<template>
  <div class="card" v-if="client">
    <div class="card-header">
      <h3><strong>ID</strong>: {{ this.ticket.idTicket }}</h3>
      <h3>{{ this.ticket.openDate }}</h3>
    </div>
    <div class="card-body">
      <h4>Dettagli</h4>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Cliente</strong>: {{ this.ticket.idClient }} - {{ this.client.society }}</li>
        <li class="list-group-item"><strong>Tecnico assegnato</strong>: {{ technicianInfo ? technicianInfo.fullName : '-' }}</li>
        <li class="list-group-item"><strong>Richiesta</strong>: {{ this.ticket.clientRequest }}</li>
        <li class="list-group-item"><strong>Data chiusura</strong>: {{ this.ticket.closeDate }}</li>
        <li class="list-group-item"><strong>Lavoro svolto</strong>: {{ this.ticket.workDone }}</li>
        <li class="list-group-item"><strong>Log attività</strong>:
          <textarea class="form-control" rows="3" readonly="">{{ this.ticket.logActivities }}</textarea>
        </li>
        <li class="list-group-item"><strong>Ore intervento</strong>: {{ this.ticket.workingHours }}</li>
        <li class="list-group-item"><strong>Fascia intervento</strong>: {{ this.ticket.transferRange }}</li>

        <li class="list-group-item"><strong>Metodo di pagamento</strong>: {{ this.ticket.paymentMethod }}</li>

        <li v-if="this.ticket.paymentMethod === 'TESSERA' || this.ticket.paymentMethod === 'TESSERA + SALDO'" class="list-group-item"><strong>Tessera</strong>:
          numero {{ this.ticket.cardNumber }},
          ore totali {{ this.ticket.cardTotalHours }},
          ore residue {{ this.ticket.cardRemainingHours }},
        </li>
        <li v-if="this.ticket.paymentMethod === 'SALDO' || this.ticket.paymentMethod === 'TESSERA + SALDO'" class="list-group-item"><strong>Saldo</strong>: €{{ this.ticket.price }}</li>
      </ul>
    </div>
    <div class="card-footer text-muted">
        <button v-if="this.role !== 'BASE'" type="button" class="btn btn-danger" @click="deleteTicket">Elimina</button>
        <router-link v-if="this.role !== 'BASE'" type="button" class="btn btn-primary" :to="{path: '/tickets/' + this.ticket.idTicket}">Modifica</router-link>
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

.btn-primary, .btn-secondary, .btn-danger {
  margin-top: 10px;
  margin-bottom: 10px;
}

.btn-secondary {
  margin-right: 15px;
}
</style>