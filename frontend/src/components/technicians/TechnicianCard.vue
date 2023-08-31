<script>
import {defineComponent} from "vue";
import axios from "axios";
import {BASE_URL} from "@/main";

export default defineComponent({
  name: "TechnicianCard",
  props: ['technician'],
  components: {
  },
  data() {
    return {
      role: null
    }
  },
  methods: {
    deleteTechnician() {
      axios.post(BASE_URL + '/removeTechnician:' + this.technician.idTechnician)
          .then(() => {
            this.$emit('technicianDeleted')
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  mounted() {
    this.role = sessionStorage.getItem('role');
  }
})

</script>

<template>
  <div class="card mb-3 border-secondary">
    <div class="card-header">ID: {{ this.technician.idTechnician }}</div>
    <div class="card-body">
      <h5 class="card-title">{{ this.technician.fullName }}</h5>
      <p class="card-text"><strong>Ruolo</strong>: {{ this.technician.role }}</p>
      <p class="card-text"><strong>Prezzo all'ora</strong>: {{ this.technician.costPerHour }}</p>
    </div>
    <div class="card-footer">
      <router-link v-if="this.role === 'ADMIN'" type="button" class="btn btn-warning btn-sm" :to="{path: '/technicians/' + this.technician.idTechnician}">
        <i class="bi bi-pencil"></i>
      </router-link>
      <button v-if="this.role === 'ADMIN'" class="btn btn-sm btn-danger" @click="deleteTechnician" title="Elimina">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

.card:not(.overlay .card) {
  max-width: 18rem;
  margin: 0 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
}

.card-body {
  height: 7rem;
  width: 18rem;
}

.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  margin: 0;
}

.btn {
  margin: 0 0.75rem 0 0.25rem;
}
</style>