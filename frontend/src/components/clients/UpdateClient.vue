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

  // TODO: add cards
})
</script>

<template>
  <form class="form" @submit="updateClient($event)">
    <fieldset>
      <h4 class="mt-3">Dettagli</h4>
      <label for="idClient" class="form-label mt-1">ID Client</label>
      <input type="text" class="form-control" id="idClient" :placeholder="this.client.idClient" readonly>
      <label for="fullName" class="form-label mt-4">Nome</label>
      <input type="text" class="form-control" id="fullName" :value="this.client.fullName">
      <label for="cellphone" class="form-label mt-4">Telefono</label>
      <input type="number" class="form-control" id="cellphone" :value="this.client.cellphone">
      <label for="mail" class="form-label mt-4">Email</label>
      <input type="email" class="form-control" id="mail" :value="this.client.mail">
      <label for="address" class="form-label mt-4">Indirizzo</label>
      <input type="text" class="form-control" id="address" :value="this.client.address">

      <ClientCardsTable :client="client"></ClientCardsTable>
    </fieldset>
    <button type="submit" class="btn btn-primary btn-sm">Salva modifiche</button>
    <router-link type="button" class="btn btn-secondary btn-sm" to="/clients">Indietro</router-link>
  </form>
</template>

<style scoped>
@import url('../../../templates/style.css');

.form {
  margin: 0 2rem 2rem;
}

.form-label, .form-control {
  padding: 0;
}

.btn {
  margin: 1rem 1rem 1rem 0;
}
</style>