<script>
import {defineComponent} from "vue";
import {BASE_URL} from "@/main";
import axios from "axios";

export default defineComponent({
  name: "UpdateTicket",
  props: ['ticket'],
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {

  }
})
</script>

<template>
  <form class="form">
    <fieldset>
      <label for="client" class="form-label mt-4">Cliente</label>
      <input type="text" class="form-control" id="client" :placeholder="this.ticket.idClient + ' - ' + this.ticket.fullNameClient" readonly>
      <label for="openDate" class="form-label mt-4">Data apertura</label>
      <input type="text" class="form-control" id="openDate" :value="this.ticket.openDate">
      <label for="closeDate" class="form-label mt-4">Data chiusura</label>
      <input type="text" class="form-control" id="closeDate" :value="this.ticket.closeDate">
    </fieldset>
  </form>
</template>

<style scoped>
@import url('../../../templates/style.css');

.form {
  margin: 0 2rem;
}

.form-label {
  padding: 0;
}

.form-control {
  padding: 0;
}
</style>