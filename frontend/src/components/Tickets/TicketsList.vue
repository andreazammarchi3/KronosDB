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
      clients: [],
      sortBy: 'openDateMinToMax',
      closed: true,
      searchTerm: '',
      currentPage: 1,
      pageSize: 10,
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
    },
    filterClosedTickets() {
      return this.sortedTickets.filter(ticket => ticket.closeDate === "")
    },
    filteredTickets() {
      let filtered = this.closed ? this.sortedTickets : this.filterClosedTickets
      if (this.searchTerm !== '' || this.searchTerm !== null) {
        filtered = filtered.filter(ticket => {
          const client = this.clients.find(client => client.idClient === ticket.idClient)
          if (client && client.fullName) {
            return client.fullName.includes(this.searchTerm)
          }
        })
      }
      return filtered
    },
    totalPages() {
      return Math.ceil(this.filteredTickets.length / this.pageSize)
    },
    paginatedTickets() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.filteredTickets.slice(startIndex, endIndex)
    }
  },
  methods: {
    sortTickets(sortBy) {
      this.sortBy = sortBy
    },
    async getTickets() {
      try {
        const response = await axios.get(`${BASE_URL}/allTickets`);
        this.tickets = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    toggleClosed() {
      this.closed = !this.closed
    },
    search(searchTerm) {
      this.searchTerm = searchTerm
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    getClients() {
      axios.get(BASE_URL + '/allClients')
        .then(response => {
          this.clients = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.getTickets()
    this.getClients()
  }
})
</script>

<template>
  <div>
    <FilterBar @sort-by="sortTickets" @closed="toggleClosed" @search="search"></FilterBar>
    <div class="ticket-list">
      <div v-for="ticket in paginatedTickets" :key="ticket.idTicket">
        <TicketCard :ticket="ticket" @ticketDeleted="getTickets"></TicketCard>
      </div>
    </div>
    <div class="pagination">
      <button class="btn btn-primary btn-sm" :disabled="currentPage === 1" @click="prevPage">Prev</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button class="btn btn-primary btn-sm" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<style scoped>
.ticket-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.pagination button {
  margin: 0 0.5rem 1rem;
}
</style>