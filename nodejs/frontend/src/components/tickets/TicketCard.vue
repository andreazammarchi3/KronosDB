<script>
import {defineComponent} from "vue";
import TicketDetails from "@/components/tickets/TicketDetails.vue";
import axios from "axios";
import {BASE_URL} from "@/main";

export default defineComponent({
  name: "TicketCard",
  props: ['ticket'],
  components: {TicketDetails},
  emits: ['ticketDeleted'],
  data() {
    return {
      completed: false,
      showDetails: false,
      client: null
    }
  },
  methods: {
    checkIfTicketIsCompleted() {
      if (this.ticket.closeDate !== '') {
        this.completed = true
      }
    },
    getClient() {
      axios.get(BASE_URL + '/getClient:' + this.ticket.idClient)
        .then(response => {
          this.client = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.checkIfTicketIsCompleted()
    this.getClient()
  }
})

</script>

<template>
  <div class="card mb-3 border-secondary" @click="showDetails = true">
    <div class="card-header">
      <div>ID: {{ this.ticket.idTicket }}</div>
      <div>{{ this.ticket.openDate }}</div>
    </div>
    <div class="card-body">
      <h5 class="card-title" v-if="client">{{ this.client.society }}</h5>
      <p class="card-text">{{ this.ticket.clientRequest }}</p>
    </div>
    <div class="card-footer">
      <span class="badge rounded-pill" :class="[completed ? 'bg-success' : 'bg-danger']"> {{ completed ? 'Chiuso' : 'Aperto' }} </span>
    </div>
  </div>

  <div class="overlay" :class="{ 'd-flex': showDetails }">
    <TicketDetails :ticket="ticket" :client="client" @close="showDetails = false; $emit('ticketDeleted')" />
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');
.card:not(.overlay .card) {
  max-width: 300px;
  margin: 10px;
  color: #023047;
  border: none;
}

.card-header {
  display: flex;
  justify-content: space-between;
  background-color: #FFFFFF;
  font-weight: bold;
}

.card-body {
  height: 125px;
  width: 300px;
}

.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  margin: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.overlay .card {
  background-color: #fff;
  padding: 0;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  width: 80%;
}

.bg-success {
  background-color: #27AE60 !important;
}

.bg-danger {
  background-color: #C70039 !important;
}

.badge {
  font-weight: normal;
}
</style>