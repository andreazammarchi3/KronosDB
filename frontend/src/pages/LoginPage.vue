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
  <h4 class="text-center">Accedi</h4>
  <div class="login-group">
    <div class="form-group" :class="error ? 'has-danger' : ''">
      <input type="text" class="form-control" :class="error ? 'is-invalid' : ''" id="idTechnician" placeholder="ID Tecnico" autocomplete="on" v-model="id">
    </div>
    <div class="form-group" :class="error ? 'has-danger' : ''">
      <input type="password" class="form-control" :class="error ? 'is-invalid' : ''" id="passwordTechnician" placeholder="Password" autocomplete="off" v-model="password" @keyup.enter="login">
      <div v-if="error" class="invalid-feedback">ID o password errati!</div>
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-primary mt-4" @click="login" autofocus>Accedi</button>
    </div>
  </div>
</template>

<style scoped>
@import url('../../templates/style.css');
.login-group {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>