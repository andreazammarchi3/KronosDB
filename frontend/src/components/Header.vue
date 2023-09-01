<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Header",
  data() {
    return {
      showOverlayBox: false,
      newNotifications: false
    }
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push({name: "Login"});
    },
    showMenuBox() {
      this.showOverlayBox = !this.showOverlayBox;
    },
    shakeNotification() {
      this.newNotifications = true;
      const notificationsIcon = document.querySelector('.notifications-icon');
      notificationsIcon.classList.add('shake');
      setTimeout(() => {
        notificationsIcon.classList.remove('shake');
      }, 500);
    }
  },
  mounted() {
    if (sessionStorage.getItem("idTechnician") === null) {
      this.$router.push({name: "Login"});
    }
  }
})
</script>

<template>
  <header class="header">
    <router-link class="nav-link logo" :to="{path: '/'}">
      <img class="header-logo" src="@/assets/img/logo.png" alt="logo">
    </router-link>
    <div class="menu-container">
      <i class="bi bi-bell-fill notifications-icon" :class="{'red-color': newNotifications}" @click="shakeNotification"></i>
      <i class="bi bi-person-circle menu-icon" id="menu-btn" @click="this.showMenuBox"></i>
      <div class="overlay-box" v-if="showOverlayBox">
        <div class="menu-item mt-3" @click="logout"><i class="bi bi-box-arrow-left"></i>Logout</div>
      </div>
    </div>
  </header>
</template>

<style scoped>
@import url('../../templates/style.css');

.header {
  height: 60px;
  background-color: #2F2F2F;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
}

.header-logo {
  height: 40px;
}

.menu-icon, .notifications-icon {
  font-size: 30px;
  color: #fff;
  cursor: pointer;
}

.notifications-icon{
  margin-right: 15px;
}

.notifications-icon.shake {
  animation: shake 0.5s;
}

.notifications-icon.red-color {
  color: #F6511D;
}

.overlay-box {
  position: absolute;
  top: 60px;
  right: 0;
  height: 60px;
  width: 100px;
  background-color: #2F2F2F;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 999;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  animation: slide-down 0.1s ease-out;
}

.menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  font-family: Overpass, sans-serif;
  color: #fff;
}

.menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-item i {
  margin-right: 8px;
  font-size: 20px;
}

@keyframes slide-down {
  from {
    transform: translateY(-10%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes shake {
  0% { transform: translateX(0); }
  10% { transform: translateX(-2px); }
  20% { transform: translateX(2px); }
  30% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  50% { transform: translateX(-2px); }
  60% { transform: translateX(2px); }
  70% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
  90% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}

</style>