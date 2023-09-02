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
  <div v-if="numberOfNotifications > 0" class="notification-container">
    <i class="bi bi-x"></i>
    <div class="notification-text"> {{ this.numberOfNotifications }} {{ this.numberOfNotifications === 1 ? 'nuovo messaggio' : 'nuovi messaggi' }} su: {{ topic }}</div>
  </div>
</template>

<style scoped>
.notification-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.notification-container .bi-x {
  font-size: 30px;
  line-height: 0.6;
}

.notification-container .notification-text {
  margin-left: 8px;
  margin-top: 2px;
}
</style>