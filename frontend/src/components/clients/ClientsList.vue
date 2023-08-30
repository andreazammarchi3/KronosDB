<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";
import ClientCard from "@/components/clients/ClientCard.vue";
import FilterBar from "@/components/clients/FilterBar.vue";

export default defineComponent({
  name: "ClientsList",
  components: {FilterBar, ClientCard},
  data() {
    return {
      clients: [],
      sortBy: 'clientFullNameMinToMax',
      searchTerm: '',
      currentPage: 1,
      pageSize: 10,
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
      return Math.ceil(this.filteredClients.length / this.pageSize)
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
    this.getClients()
  }
})
</script>

<template>
  <div>
    <FilterBar @sort-by="sortClients" @search="search"></FilterBar>
    <div class="client-list">
      <div v-for="client in paginatedClients" :key="client.idClient">
        <ClientCard :client="client"></ClientCard>
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
@import url('../../../templates/style.css');
.client-list {
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