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
    deleteTicket() {
      axios.post(BASE_URL + '/removeTicket:' + this.ticket.idTicket)
          .then(() => {
            this.$emit('close')
          })
          .catch(error => {
            console.log(error)
          })
    }
  },
  mounted() {
  }
})
</script>

<template>

</template>

<style scoped>
@import url('../../../templates/style.css');
</style>