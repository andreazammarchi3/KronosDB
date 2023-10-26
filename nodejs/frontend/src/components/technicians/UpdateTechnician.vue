  <script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";
import sha256 from 'crypto-js/sha256';

export default defineComponent({
  name: "UpdateTechnician",
  components: {},
  props: ['technician'],
  data() {
    return {
      admin: false,
      username: null,
    }
  },
  methods: {
    updateTechnician(event) {
      event.preventDefault();

      const fullName = document.getElementById('fullName').value;
      const admin = document.getElementById('admin').checked;
      const password = document.getElementById('password').value;

      axios.get(BASE_URL + '/allTechnicians').then(response => {
        axios.post(BASE_URL + '/updateTechnician:' + this.technician.username, {
          username: this.technician.username,
          fullName: fullName,
          admin: admin,
          password: password == "" && sha256(this.technician.password) != password ? this.technician.password : sha256(password)
        }).then(response => {
          this.$router.push('/technicians')
        }).catch(error => {
          alert(error);
        });
      }).catch(error => {
        alert(error);
      });
    },
  },
  computed: {
  },
  mounted() {
    this.admin = sessionStorage.getItem("admin") === "true"
    this.username = sessionStorage.getItem("username");
  }
})
</script>

<template>
  <div class="form-container">
    <h1>MODIFICA TECNICO</h1>
    <form class="form" @submit="updateTechnician($event)">
      <fieldset>
        <h4 class="mt-3">Dettagli</h4>
        <label for="username" class="form-label mt-1">Username</label>
        <input type="text" class="form-control" id="username" :placeholder="this.technician.username" readonly>
        <label for="fullName" class="form-label mt-4">Nome</label>
        <input type="text" class="form-control" id="fullName" :value="this.technician.fullName">
        <label for="password" class="form-label mt-4">Password</label>
        <input type="password" class="form-control" id="password" placeholder="password" :disabled="!this.username === this.technician.username">
        <input class="form-check-input" type="checkbox" value="" id="admin" :checked="this.technician.admin" :disabled="!this.admin">
        <label class="form-check-label" for="admin" >Admin</label>
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