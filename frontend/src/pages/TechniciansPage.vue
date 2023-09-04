<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";
import TechnicianCard from "@/components/technicians/TechnicianCard.vue";
import FilterBar from "@/components/technicians/FilterBar.vue";
import Header from "@/components/Header.vue";
import io from "socket.io-client";

export default defineComponent({
  name: "TechniciansPage",
  components: {Header, FilterBar, TechnicianCard},
  data() {
    return {
      technicians: [],
      sortBy: 'technicianFullNameMinToMax',
      searchTerm: '',
      currentPage: 1,
      pageSize: 10,
      socket: io(BASE_URL),
    }
  },
  computed: {
    sortedTechnicians() {
      return this.technicians.sort((a, b) => {
        if (this.sortBy === 'technicianFullNameMinToMax') {
          return a.fullName.localeCompare(b.fullName)
        } else if (this.sortBy === 'technicianFullNameMaxToMin') {
          return b.fullName.localeCompare(a.fullName)
        }
      })
    },
    filteredTechnicians() {
      let filtered = this.sortedTechnicians
      if (this.searchTerm !== '' || this.searchTerm !== null) {
        filtered = filtered.filter(technician => {
          return technician.fullName.includes(this.searchTerm)
        })
      }
      return filtered
    },
    totalPages() {
      const pageCount = Math.ceil(this.filteredTechnicians.length / this.pageSize);
      return pageCount === 0 ? 1 : pageCount
    },
    paginatedTechnicians() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.filteredTechnicians.slice(startIndex, endIndex)
    }
  },
  methods: {
    sortTechnicians(sortBy) {
      this.sortBy = sortBy
    },
    async getTechnicians() {
      try {
        const response = await axios.get(`${BASE_URL}/allTechnicians`);
        this.technicians = response.data;
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
    const role = sessionStorage.getItem('role');
    if (role === 'BASE') this.$router.push('/401');
    this.getTechnicians();

    this.socket.on('TECHNICIANS', (data) => {
      this.technicians = data;
    });
  }
})
</script>

<template>
  <Header></Header>
  <div class="page-container">
    <h1>TECNICI</h1>
    <FilterBar @sort-by="sortTechnicians" @search="search"></FilterBar>
    <div class="technicians-list">
      <div v-for="technician in paginatedTechnicians" :key="technician.idTechnician">
        <TechnicianCard :technician="technician" @technicianDeleted="getTechnicians"></TechnicianCard>
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

.technicians-list {
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