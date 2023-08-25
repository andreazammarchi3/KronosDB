<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "TicketCard",
  props: ['ticket'],
  data() {
    return {
      routeName: "TicketDetails"
    }
  }
})
</script>

<template>
  <div class="card bg-secondary mb-3" style="max-width: 20rem;">
    <div class="card-header">{{ this.ticket.idTicket }}</div>
    <div class="card-body">
      <h4 class="card-title">{{ this.ticket.idClient }}</h4>
      <p class="card-text">{{ this.ticket.clientRequest }}</p>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');
</style>