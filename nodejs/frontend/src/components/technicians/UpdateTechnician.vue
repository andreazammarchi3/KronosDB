<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";

export default defineComponent({
  name: "UpdateTechnician",
  components: {},
  props: ['technician'],
  data() {
    return {
    }
  },
  methods: {
    updateTechnician(event) {
      event.preventDefault();

      const fullName = document.getElementById('fullName').value
      const role = this.technician.role

      axios.get(BASE_URL + '/allTechnicians').then(response => {
        const technicians = response.data;
        const technician = technicians.filter(technician => technician.role === this.technician.role)[0];
        const costPerHour = technician ? technician.costPerHour : 0;

        axios.post(BASE_URL + '/updateTechnician:' + this.technician.idTechnician, {
          idTechnician: this.technician.idTechnician,
          fullName: fullName,
          role: role,
          costPerHour: costPerHour
        }).then(response => {
          console.log(response)
          this.$router.push('/technicians')
        }).catch(error => {
          console.log(error)
        });
      }).catch(error => {
        console.log(error)
      });
    },
    updateRole() {
      this.technician.role = document.getElementById('role').value;
    }
  },
  computed: {
  },
  mounted() {
  }
})
</script>

<template>
  <div class="form-container">
    <h1>MODIFICA TECNICO</h1>
    <form class="form" @submit="updateTechnician($event)">
      <fieldset>
        <h4 class="mt-3">Dettagli</h4>
        <label for="idTechnician" class="form-label mt-1">ID Tecnico</label>
        <input type="text" class="form-control" id="idTechnician" :placeholder="this.technician.idTechnician" readonly>
        <label for="fullName" class="form-label mt-4">Nome</label>
        <input type="text" class="form-control" id="fullName" :value="this.technician.fullName">
        <label for="role" class="form-label mt-4">Ruolo</label>
        <select class="form-select" id="role" @change="updateRole">
          <option value="BASE" :selected="technician.role === 'BASE'">BASE</option>
          <option value="JUNIOR" :selected="technician.role === 'JUNIOR'">JUNIOR</option>
          <option value="SENIOR" :selected="technician.role === 'SENIOR'">SENIOR</option>
          <option value="ADMIN" :selected="technician.role === 'ADMIN'">ADMIN</option>
        </select>

      </fieldset>
      <button type="submit" class="btn btn-primary marg-btn">Salva modifiche</button>
      <router-link type="button" class="btn btn-secondary marg-btn" to="/technicians">Indietro</router-link>
    </form>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

h4 {
  margin-top: 20px;
  margin-bottom: 0;
}

h4:first-child {
  margin-top: 0;
  margin-bottom: 10px;
}

.form-container {
  background-color: #8ECAE6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100vh - 60px);
  width: 100%;
  font-family: Overpass, sans-serif;
}

.form {
  background-color: #8ECAE6;
  width: 100%;
  padding-right: 5%;
  padding-left: 5%;
  padding-bottom: 30px;
}

.marg-btn {
  margin-top: 25px !important;
  margin-left: 0 !important;
  margin-right: 10px !important;
}
</style>