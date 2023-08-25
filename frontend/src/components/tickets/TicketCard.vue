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
      routeName: "TicketDetails"
    }
  },
  methods: {
    getClientFullName() {
      axios.get(`${BASE_URL}/getClient:${this.ticket.idClient}`).then(response => {
        this.clientFullName = response.data.fullName
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getClientFullName()
  }
})
</script>

<template>
  <div class="card border-secondary mb-3" style="max-width: 20rem;">
    <div class="card-header" style="display: flex; justify-content: space-between;">
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
.card-body {
  height: 5rem;
  width: 18rem;
}

.card-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>