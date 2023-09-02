<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Notification",
  props: ['numberOfNotifications', 'topic'],
  data() {
    return {
    }
  },
});

</script>

<template>
  <div v-if="numberOfNotifications > 0"> {{ this.numberOfNotifications }} {{ this.numberOfNotifications === 1 ? 'nuovo messaggio' : 'nuovi messaggi' }} su: {{ topic }}</div>
</template>

<style scoped>

</style>