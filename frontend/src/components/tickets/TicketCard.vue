<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";

export default defineComponent({
  name: "TicketCard",
  props: ['ticket'],
  data() {
    return {
      clientFullName: null,
      routeName: "TicketDetails",
      completed: false,
    }
  },
  methods: {
    getClientFullName() {
      axios.get(`${BASE_URL}/getClient:${this.ticket.idClient}`).then(response => {
        this.clientFullName = response.data.fullName
      }).catch(error => {
        console.log(error)
      })
    },
    checkIfTicketIsCompleted() {
      if (this.ticket.closeDate !== '') {
        this.completed = true
      }
    }
  },
  mounted() {
    this.getClientFullName()
    this.checkIfTicketIsCompleted()
  }
})
</script>

<template>
  <div class="card mb-3" :class="[completed ? 'border-secondary' : 'border-warning']">
    <div class="card-header">
      <div>ID: {{ this.ticket.idTicket }}</div>
      <div>{{ this.ticket.openDate }}</div>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ this.clientFullName }}</h5>
      <p class="card-text">{{ this.ticket.clientRequest }}</p>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

.card {
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
</style>