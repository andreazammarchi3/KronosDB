<script>
import {defineComponent} from "vue";
import io from "socket.io-client";
import {BASE_URL} from "@/main";
import axios from "axios";
import Notification from "@/components/Notification.vue";

export default defineComponent({
  name: "Header",
  components: {Notification},
  data() {
    return {
      chats: [],
      notifications: [],
      showOverlayNotificationsBox: false,
      showOverlayMenuBox: false,
      socket: io(BASE_URL),
    }
  },
  methods: {
    getDifferentMessages(oldMessages, newMessages) {
      const differentMessages = [];
      newMessages.forEach(newMessage => {
        if (!oldMessages.some(oldMessage => oldMessage.id === newMessage.id)) {
          differentMessages.push(newMessage);
        }
      });
      return differentMessages;
    },
    addNotificationForEachMessage(topic, messages) {
      messages.forEach(message => {
        if (this.notifications.length === 0 || !this.notifications.some(notification => notification.message.id === message.id)) {
          this.notifications.push({
            topic: topic,
            message: message,
          });
        }
      });
    },
    getChats() {
      axios.get(BASE_URL + '/allChats').then((response) => {
        this.chats = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    logout() {
      sessionStorage.clear();
      this.$router.push({name: "Login"});
    },
    showMenuBox() {
      this.showOverlayNotificationsBox = false;
      this.showOverlayMenuBox = !this.showOverlayMenuBox;
    },
    showNotificationsBox() {
      this.showOverlayMenuBox = false;
      this.showOverlayNotificationsBox = !this.showOverlayNotificationsBox;
    },
    shakeNotification() {
      const notificationsIcon = document.getElementById('notifications-icon');
      if (!notificationsIcon.classList.contains('red-color')) {
        notificationsIcon.classList.add('red-color');
      }
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

    this.getChats();

    this.socket.on('CHAT', (data) => {
      this.chats.forEach(chat => {
        if (chat.topic === data.topic) {
          console.log(data.topic);
          this.addNotificationForEachMessage(chat.topic, this.getDifferentMessages(chat.messages, data.messages));
          console.log(this.notifications);
          chat.messages = data.messages;
        }
      });
      this.shakeNotification();
    });

  },
  computed: {
    notificationsInChat() {
      return (chat) => {
        return this.notifications.filter(notification => notification.topic === chat.topic).length;
      }
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
      <i class="bi bi-chat icon chat-icon" id="chat-btn" title="Chat" @click="this.$router.push('/chat')"></i>
      <i class="bi bi-bell-fill icon notifications-icon" id="notifications-icon" title="Notifiche" @click="this.showNotificationsBox"></i>
      <i class="bi bi-person-circle icon menu-icon" id="menu-btn" title="Menu" @click="this.showMenuBox"></i>

      <div class="overlay-box overlay-menu-box" v-if="showOverlayMenuBox">
        <div class="menu-item mt-3" @click="logout"><i class="bi bi-box-arrow-left"></i>Logout</div>
      </div>

      <div class="overlay-box overlay-notifications-box" v-if="showOverlayNotificationsBox">
        <div v-if="notifications.length === 0" class="notification">Nessuna nuova notifica</div>
        <Notification v-else v-for="chat in chats" :numberOfNotifications="notificationsInChat(chat)" :topic="chat.topic" class="notification"></Notification>
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

.icon {
  font-size: 30px;
  color: #fff;
  cursor: pointer;
}

.notifications-icon, .chat-icon {
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
  background-color: #2F2F2F;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 999;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  animation: slide-down 0.1s ease-out;
}

.overlay-menu-box {
  right: 5px;
  height: 60px;
  width: 100px;
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

.overlay-notifications-box {
  right: 50px;
  width: auto;
  max-width: 50%;
  max-height: 30%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.notification {
  margin: 10px;
  padding: 10px;
  width: 200px;
  border-radius: 5px;
  font-family: Overpass, sans-serif;
  color: #fff;
  background-color: #F6511D;
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