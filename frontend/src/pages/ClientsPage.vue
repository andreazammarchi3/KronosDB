<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";
import ClientCard from "@/components/clients/ClientCard.vue";
import FilterBar from "@/components/clients/FilterBar.vue";
import Header from "@/components/Header.vue";
import io from "socket.io-client";

export default defineComponent({
  name: "ClientsPage",
  components: {Header, FilterBar, ClientCard},
  data() {
    return {
      clients: [],
      sortBy: 'clientFullNameMinToMax',
      searchTerm: '',
      currentPage: 1,
      pageSize: 10,
      socket: io(BASE_URL),
    }
  },
  computed: {
    sortedClients() {
      return this.clients.sort((a, b) => {
        if (this.sortBy === 'clientFullNameMinToMax') {
          return a.fullName.localeCompare(b.fullName)
        } else if (this.sortBy === 'clientFullNameMaxToMin') {
          return b.fullName.localeCompare(a.fullName)
        }
      })
    },
    filteredClients() {
      let filtered = this.sortedClients
      if (this.searchTerm !== '' || this.searchTerm !== null) {
        filtered = filtered.filter(client => {
          return client.fullName.includes(this.searchTerm)
        })
      }
      return filtered
    },
    totalPages() {
      const pageCount = Math.ceil(this.filteredClients.length / this.pageSize);
      return pageCount === 0 ? 1 : pageCount
    },
    paginatedClients() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.filteredClients.slice(startIndex, endIndex)
    }
  },
  methods: {
    sortClients(sortBy) {
      this.sortBy = sortBy
    },
    async getClients() {
      try {
        const response = await axios.get(`${BASE_URL}/allClients`);
        this.clients = response.data;
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
    }
  },
  mounted() {
    this.getClients();

    this.socket.on('CLIENTS', (data) => {
      this.clients = data;
    });
  }
})
</script>

<template>
  <Header></Header>
  <div class="page-container">
    <h1>CLIENTI</h1>
    <div>
      <FilterBar @sort-by="sortClients" @search="search"></FilterBar>
      <div class="client-list">
        <div v-for="client in paginatedClients" :key="client.idClient">
          <ClientCard :client="client"></ClientCard>
        </div>
      </div>
      <div class="pagination">
        <button class="btn btn-primary" :disabled="currentPage === 1" @click="prevPage">&lt;</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button class="btn btn-primary" :disabled="currentPage === totalPages" @click="nextPage">></button>
      </div>
    </div>
  </div>
</template>

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

.client-list {
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
</style>