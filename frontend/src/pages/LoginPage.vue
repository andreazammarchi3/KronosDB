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
.login-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #8ECAE6;
  height: 100vh;
  font-family: Overpass, sans-serif;
}

h1 {
  font-weight: bold;
  margin: 0;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #023047;
}

.form-control {
  width: 200px;
  margin-top: 10px;
  color: #023047;
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem #219EBC;
  color: #023047;
}

.invalid {
  border-color: #FF5733;
}

.invalid:focus {
  box-shadow: 0 0 0 0.25rem #FF5733;
}

.invalid-feedback {
  display: none;
  width: 200px;
  margin-top: 5px;
  text-align: center;
  justify-content: center;
}

.btn-primary {
  width: 100px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 0;
  background-image: linear-gradient(to bottom, #FFB703, #FB8500);
  border: none;
  font-size: 20px;
}

.btn-primary:hover, .btn-primary:focus, .btn-primary:active {
  background-image: linear-gradient(to bottom, #FB8500, #FFB703);
  cursor: pointer;
  box-shadow: 0 0 0 0.25rem #219EBC;
}
</style>