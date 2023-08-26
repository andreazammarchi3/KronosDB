<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";
import TicketCard from "@/components/tickets/TicketCard.vue";
import FilterBar from "@/components/tickets/FilterBar.vue";

export default defineComponent({
  name: "TicketsList",
  components: {FilterBar, TicketCard},
  data() {
    return {
      tickets: [],
      sortBy: 'openDateMinToMax'
    }
  },
  computed: {
    sortedTickets() {
      return this.tickets.sort((a, b) => {
        if (this.sortBy === 'openDateMinToMax') {
          return new Date(a.openDate) - new Date(b.openDate)
        } else if (this.sortBy === 'openDateMaxToMin') {
          return new Date(b.openDate) - new Date(a.openDate)
        } else if (this.sortBy === 'clientFullNameMinToMax') {
          return a.fullNameClient.localeCompare(b.fullNameClient)
        } else if (this.sortBy === 'clientFullNameMaxToMin') {
          return b.fullNameClient.localeCompare(a.fullNameClient)
        }
      })
    }
  },
  methods: {
    sortTickets(sortBy) {
      this.sortBy = sortBy
    },
    getTickets() {
      axios.get(`${BASE_URL}/allTickets`).then(response => {
        this.tickets = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getTickets()
  }
})

// TODO: add other filters
// TODO: add search bar
</script>

<template>
  <FilterBar @sort-by="sortTickets"></FilterBar>
  <div class="ticket-list">
    <div v-for="ticket in sortedTickets" :key="ticket.idTicket">
      <TicketCard :ticket="ticket"></TicketCard>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');
.ticket-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

</style>
