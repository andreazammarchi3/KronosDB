<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";
import TechnicianCard from "@/components/technicians/TechnicianCard.vue";
import FilterBar from "@/components/technicians/FilterBar.vue";

export default defineComponent({
  name: "TechniciansList",
  components: {FilterBar, TechnicianCard},
  data() {
    return {
      technicians: [],
      sortBy: 'technicianFullNameMinToMax',
      searchTerm: '',
      currentPage: 1,
      pageSize: 10,
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
      return Math.ceil(this.filteredTechnicians.length / this.pageSize)
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
    this.getTechnicians()
  }
})
</script>

<template>
  <div>
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
@import url('../../../templates/style.css');
.technicians-list {
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