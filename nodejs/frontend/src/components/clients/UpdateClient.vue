<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";
import ClientCardsTable from "@/components/clients/ClientCardsTable.vue";

export default defineComponent({
  name: "UpdateClient",
  components: {ClientCardsTable},
  props: ['client'],
  data() {
    return {
    }
  },
  methods: {
    updateClient(event) {
      event.preventDefault();

      const fullName = document.getElementById('fullName').value
      const cellphone = document.getElementById('cellphone').value
      const mail = document.getElementById('mail').value
      const address = document.getElementById('address').value

      axios.post(BASE_URL + '/updateClient:' + this.client.idClient, {
        idClient: this.client.idClient,
        fullName: fullName,
        address: address,
        cellphone: cellphone,
        mail: mail
      })
        .then(response => {
          console.log(response)
          this.$router.push('/clients')
        })
        .catch(error => {
          console.log(error)
        })
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
    <h1>MODIFICA CLIENTE</h1>
    <form class="form" @submit="updateClient($event)">
      <fieldset>
        <h4>Dettagli</h4>
        <label for="idClient" class="form-label">ID Cliente</label>
        <input type="text" class="form-control" id="idClient" :placeholder="this.client.idClient" readonly>
        <label for="fullName" class="form-label">Nome</label>
        <input type="text" class="form-control" id="fullName" :value="this.client.fullName">
        <label for="cellphone" class="form-label">Telefono</label>
        <input type="number" class="form-control" id="cellphone" :value="this.client.cellphone">
        <label for="mail" class="form-label">Email</label>
        <input type="email" class="form-control" id="mail" :value="this.client.mail">
        <label for="address" class="form-label">Indirizzo</label>
        <input type="text" class="form-control" id="address" :value="this.client.address">
        <h4>Tessere</h4>
        <ClientCardsTable :client="client"></ClientCardsTable>
      </fieldset>
      <button type="submit" class="btn btn-primary marg-btn">Salva modifiche</button>
      <router-link type="button" class="btn btn-primary marg-btn" to="/clients">Indietro</router-link>
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