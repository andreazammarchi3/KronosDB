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
  <div class="card mb-3 border-secondary" @click="showDetails = true">
    <div class="card-header">ID: {{ this.client.idClient }}</div>
    <div class="card-body">
      <h5 class="card-title">{{ this.client.fullName }}</h5>
      <p class="card-text"><strong>Telefono</strong>: {{ this.client.cellphone }}</p>
      <p class="card-text"><strong>Email</strong>: {{ this.client.mail }}</p>
      <p class="card-text"><strong>Indirizzo</strong>: {{ this.client.address }}</p>
    </div>
    <div class="card-footer">
    </div>
  </div>

  <div class="overlay" :class="{ 'd-flex': showDetails }">
    <ClientDetails :client="client" @close="showDetails = false" />
  </div>
</template>

<style scoped>
.card:not(.overlay .card) {
  max-width: 18rem;
  margin: 0 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
}

.card-body {
  height: 10rem;
  width: 18rem;
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
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  width: 80%;
}
</style>