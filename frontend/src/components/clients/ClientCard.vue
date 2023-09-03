<script>
import {defineComponent} from "vue";
import ClientDetails from "@/components/clients/ClientDetails.vue";

export default defineComponent({
  name: "ClientCard",
  props: ['client'],
  components: {ClientDetails},
  data() {
    return {
      showDetails: false
    }
  },
  methods: {
  },
  mounted() {
  }
})

</script>

<template>
  <div class="card border-secondary" @click="showDetails = true">
    <div class="card-header">ID: {{ this.client.idClient }}</div>
    <div class="card-body">
      <h5 class="card-title">{{ this.client.fullName }}</h5>
      <p class="card-text"><strong>Telefono</strong>: {{ this.client.cellphone }}</p>
      <p class="card-text"><strong>Email</strong>: {{ this.client.mail }}</p>
      <p class="card-text"><strong>Indirizzo</strong>: {{ this.client.address }}</p>
    </div>
  </div>

  <div class="overlay" :class="{ 'd-flex': showDetails }">
    <ClientDetails :client="client" @close="showDetails = false" />
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
  height: 150px;
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.overlay .card {
  background-color: #fff;
  padding: 0;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  width: 80%;
}
</style>