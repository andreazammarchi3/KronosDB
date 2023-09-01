<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Header",
  data() {
    return {
      showOverlayBox: false,
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
      <i class="bi bi-person-circle menu" id="menu-btn" @click="this.showMenuBox"></i>
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
  padding-left: 10px;
  padding-right: 10px;
}

.header-logo {
  height: 40px;
}

.menu {
  font-size: 30px;
  color: #fff;
  cursor: pointer;
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
  position: relative;
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

</style>