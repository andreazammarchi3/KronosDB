<template>
  <Header></Header>
  <div class="page-container">
    <h1>TICKET</h1>

    <div class="btn-container">
      <button class="btn btn-primary" @click="showFilterBar = !showFilterBar" title="Filtra"><i class="bi bi-funnel"></i></button>
      <hr class="h-divider">
<!--      <button class="btn btn-primary" title="Ordina"><i class="bi bi-sort-alpha-down"></i></button>-->
      <select class="form-select" id="sort-by" v-model="sortBy" title="Ordina">
        <option value="openDateMinToMax">Dal meno recente</option>
        <option value="openDateMaxToMin">Dal più recente</option>
        <option value="clientFullNameMinToMax">Per cliente (A-Z)</option>
        <option value="clientFullNameMaxToMin">Per cliente (Z-A)</option>
      </select>
    </div>

    <hr class="v-divider">
    <div class="filter-bar" v-show="showFilterBar">
      <div class="filter-buttons-container">
        <button class="btn btn-danger filter-btn" @click="resetFilters">Ripristina filtri</button>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="show-closed" v-model="hideClosedTickets">
        <label class="form-check-label" for="show-closed">Nascondi ticket chiusi</label>
      </div>
      <!-- Add filter options here -->
    </div>
    <div class="ticket-list">
      <div v-for="ticket in paginatedTickets" :key="ticket.idTicket">
        <TicketCard :ticket="ticket" @ticketDeleted="getTickets"></TicketCard>
      </div>
    </div>
    <div class="pagination">
      <button class="btn btn-primary" :disabled="currentPage === 1" @click="prevPage">Prev</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button class="btn btn-primary" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";
import TicketCard from "@/components/tickets/TicketCard.vue";
import Header from "@/components/Header.vue";
import io from "socket.io-client";

export default defineComponent({
  name: "TicketsPage",
  components: {Header, TicketCard},
  data() {
    return {
      tickets: [],
      clients: [],
      sortBy: 'openDateMinToMax',
      hideClosedTickets: false,
      searchTerm: '',
      currentPage: 1,
      pageSize: 10,
      socket: io(BASE_URL),
      showFilterBar: false,
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
    filteredTickets() {
      let filtered = this.sortedTickets
      if (this.hideClosedTickets) {
        filtered = filtered.filter(ticket => ticket.closeDate === "")
      }
      return filtered
    },
    totalPages() {
      const pageCount = Math.ceil(this.filteredTickets.length / this.pageSize);
      return pageCount === 0 ? 1 : pageCount
    },
    paginatedTickets() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.filteredTickets.slice(startIndex, endIndex)
    }
  },
  methods: {
    async getTickets() {
      try {
        const response = await axios.get(`${BASE_URL}/allTickets`);
        this.tickets = response.data;
      } catch (error) {
        console.log(error);
      }
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
    resetFilters() {
      this.hideClosedTickets = false;
    },
  },
  mounted() {
    this.getTickets()
    this.getClients()

    this.socket.on('TICKETS', (data) => {
      this.tickets = data;
    });

    this.socket.on('CLIENTS', (data) => {
      this.clients = data;
    });
  }
})
</script>

<style scoped>
@import url('../../templates/style.css');

.page-container {
  background-color: #8ECAE6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100vh - 60px);
  width: 100%;
  font-family: Overpass, sans-serif;
}

.ticket-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.btn-primary {
  margin: 5px !important;
}

.filter-bar {
  position: absolute;
  top: 200px;
  left: 0;
  bottom: 0;
  width: 20%;
  background-color: white;
  z-index: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.v-divider {
  border-top: 2px solid black;
  margin: 10px 0;
  width: 100%;
}

.h-divider {
  border-left: 2px solid black;
  height: 20px;
  margin: 0 20px;
}

.filter-buttons-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 15px;
}

.filter-btn {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
}

i {
  font-size: 18px;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-container .btn-primary {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.btn-container .form-select {
  margin-top: 0;
  margin-bottom: 0;
}

.filter-bar > * {
  margin: 5px 0;
}

@media (max-width: 768px) {
  .filter-bar {
    width: 100%;
  }
}
</style>
