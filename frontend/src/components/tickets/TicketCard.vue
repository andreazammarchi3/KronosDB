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
      <h5 class="card-title" v-if="client">{{ this.client.fullName }}</h5>
      <p class="card-text">{{ this.ticket.clientRequest }}</p>
    </div>
    <div class="card-footer">
      <span class="badge rounded-pill" :class="[completed ? 'bg-success' : 'bg-danger']"> {{ completed ? 'Chiuso' : 'Aperto' }} </span>
    </div>
  </div>

  <div class="overlay" :class="{ 'd-flex': showDetails }">
    <TicketDetails :ticket="ticket" @close="showDetails = false; $emit('ticketDeleted')" />
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

.card:not(.overlay .card) {
  max-width: 18rem;
  margin: 0 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
}

.card-body {
  height: 8rem;
  width: 18rem;
}

.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
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
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  width: 80%;
}
</style>