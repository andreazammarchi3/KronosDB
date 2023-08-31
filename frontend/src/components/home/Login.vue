<script>
import {defineComponent} from 'vue';
import axios from "axios";
import {BASE_URL} from "@/main";
import sha256 from 'crypto-js/sha256';

export default defineComponent({
  name: "Login",
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
          if (t.idTechnician === this.id && t.password === sha256(this.password)) {
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
});

</script>

<template>
  <div class="login-group">
    <div class="form-group" :class="error ? 'has-danger' : ''">
      <label for="idTechnician" class="form-label mt-4">ID Tecnico</label>
      <input type="text" class="form-control" :class="error ? 'is-invalid' : ''" id="idTechnician" placeholder="ID" autocomplete="on" v-model="id">
    </div>
    <div class="form-group" :class="error ? 'has-danger' : ''">
      <label for="passwordTechnician" class="form-label mt-4">Password</label>
      <input type="password" class="form-control" :class="error ? 'is-invalid' : ''" id="passwordTechnician" placeholder="Password" autocomplete="off" v-model="password" @keyup.enter="login">
      <div v-if="error" class="invalid-feedback">ID o password errati!</div>
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-primary mt-4" @click="login" autofocus>Accedi</button>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

.login-group {
  margin: 0 2rem 2rem;
}
</style>