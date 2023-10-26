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
      admin: false,
      username: null
    }
  },
  methods: {
    deleteTechnician() {
      axios.post(BASE_URL + '/removeTechnician:' + this.technician.username)
          .then(() => {
            this.$emit('technicianDeleted')
          })
          .catch(error => {
            alert(error);
          })
    },
  },
  mounted() {
    this.admin = sessionStorage.getItem('admin') === "true";
    this.username = sessionStorage.getItem('username');
  }
})

</script>

<template>
  <div class="card border-secondary">
    <div class="card-header">Username: {{ this.technician.username }}</div>
    <div class="card-body">
      <h5 class="card-title">{{ this.technician.fullName }}</h5>
      <p class="card-text"><strong>Admin</strong>: {{ this.technician.admin ? "Sì" : "No" }}</p>
    </div>
    <div class="card-footer">
      <router-link v-if="this.admin === true || this.technician.username === this.username" type="button" class="btn btn-primary" :to="{path: '/technicians/' + this.technician.username}" title="Modifica">
        <i class="bi bi-pencil"></i>
      </router-link>
      <button v-if="this.admin === true" class="btn btn-danger" @click="deleteTechnician" title="Elimina">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');
.card:not(.overlay .card) {
  max-width: 300px;
  margin: 10px;
  color: #023047;
  border: none;
}

.card-header {
  display: flex;
  justify-content: space-between;
  background-color: #FFFFFF;
  font-weight: bold;
}

.card-body {
  height: 100px;
  width: 300px;
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
  width: 30px !important;
  height: 30px !important;
  padding: 5px !important;
}
</style>