<script>
import {defineComponent} from 'vue'
import axios from "axios";
import {BASE_URL} from "@/main";
import sha256 from 'crypto-js/sha256';

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      technicians: [],
      id: "",
      password: "",
      error: false
    }
  },
  methods: {
    login() {
      axios.get(BASE_URL + '/allTechnicians').then(response => {
        this.technicians = response.data;
        this.technicians.forEach(t => {
          if (t.idTechnician == parseInt(this.id) && t.password == sha256(this.password)) {
            sessionStorage.setItem("idTechnician", t.idTechnician);
            sessionStorage.setItem("fullName", t.fullName);
            sessionStorage.setItem("role", t.role);
            this.error = false;
            this.$router.push({name: "Home"});
          }
        });
        this.error = true;
      }).catch(error => {
        console.log(error)
      });
    }
  }
})
</script>

<template>
  <div class="login-group">
    <h1>Login</h1>
    <input type="text" class="form-control" :class="error ? 'invalid' : ''" id="idTechnician" placeholder="ID Tecnico" autocomplete="on" v-model="id">
    <input type="password" class="form-control" :class="error ? 'invalid' : ''" id="passwordTechnician" placeholder="Password" autocomplete="off" v-model="password" @keyup.enter="login">
    <button type="button" class="btn btn-primary" @click="login" autofocus>Accedi</button>
  </div>
</template>

<style scoped>
@import url('../../templates/style.css');

.login-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #8ECAE6;
  height: 100vh;
  font-family: Overpass, sans-serif;
}

.form-control {
  width: 200px;
  margin-top: 10px;
}

.invalid {
  border-color: #FF5733;
}

.invalid:focus {
  box-shadow: 0 0 0 2px #FF5733;
}
</style>