<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import {BASE_URL} from "@/main";

export default {
  name: 'GroupChat',
  components: {Header},
  data() {
    return {
      technicians: [],
      chats: [],
      activeTopicName: null,
      newMessage: '',
      sidebarVisible: true,
      sidebarToggleVisible: true,
      sidebarOverlay: false,
    }
  },
  computed: {
    activeChat() {
      return this.chats.find(chat => chat.topic === this.activeTopicName);
    },
    formattedTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  },
  methods: {
    getTechnicians() {
      axios.get(BASE_URL + '/allTechnicians').then(response => {
        this.technicians = response.data;
      }).catch(error => {
        console.log(error);
      });
    },
    setActiveTopic(topic) {
      this.activeTopicName = topic;
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const newId = this.activeChat.messages.length + 1;
        const newMessage = {
          id: newId,
          sender: sessionStorage.getItem("fullName"),
          time: this.formattedTime,
          text: this.newMessage.trim(),
        };
        this.activeChat.messages.push(newMessage);
        axios.post(BASE_URL + '/newMessage:' + this.activeTopicName, {messages: this.activeChat.messages}).then(response => {
          console.log(response.data);
        }).catch(error => {
          console.log(error);
        });
        this.newMessage = '';
      }
    },
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    handleResize() {
      if (window.innerWidth >= 768) {
        this.sidebarVisible = true;
        this.sidebarToggleVisible = false;
        this.sidebarOverlay = false;
      } else {
        this.sidebarToggleVisible = true;
        this.sidebarOverlay = true;
      }
    },
    getChats() {
      axios.get(BASE_URL + '/allChats').then(response => {
        this.chats = response.data;
        this.activeTopicName = this.chats[0].topic;
      }).catch(error => {
        console.log(error);
      });
    }
  },
  created() {
    if (sessionStorage.getItem("idTechnician") === null) {
      this.$router.push({name: "Login"});
    }
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    this.getChats();
    this.getTechnicians();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<template>
  <Header></Header>
  <div v-if="this.chats.length !== 0 && this.technicians.length !== 0" class="group-chat">
    <div class="chat-sidebar" :class="{ 'hidden': !sidebarVisible, 'overlay': sidebarOverlay }">
      <ul class="topic-list">
        <li v-for="chat in this.chats" :class="{ 'active': chat.topic === activeTopicName }" @click="setActiveTopic(chat.topic)">
          {{ chat.topic }}
        </li>
      </ul>
    </div>
    <div class="chat-main">
      <div class="chat-header">
        <button class="toggle-button" v-if="sidebarToggleVisible" @click="toggleSidebar">{{ sidebarVisible ? 'Hide Topics' : 'Show Topics' }}</button>
        <h2>{{ activeTopicName }}</h2>
      </div>
      <div class="chat-messages">
        <div v-for="message in activeChat.messages" :key="message.id" class="message">
          <div class="message-header">
            <span class="message-sender">{{ message.sender }}</span>
            <span class="message-time">{{ message.time }}</span>
          </div>
          <div class="message-body">
            {{ message.text }}
          </div>
        </div>
      </div>
      <div class="chat-input">
        <input type="text" id="textMsg" v-model="newMessage" placeholder="Digita messaggio..." @keyup.enter="sendMessage">
        <button @click="sendMessage"><i class="bi bi-send-fill"></i></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
div *:not(Header) {
  font-family: Overpass, sans-serif;
}

.group-chat {
  display: flex;
  height: calc(100vh - 60px);
}

.chat-sidebar {
  flex: 0 0 200px;
  background-color: #eee;
  padding: 10px;
  transition: transform 0.3s ease-in-out;
}

.chat-sidebar.hidden {
  transform: translateX(-200px);
}

.chat-sidebar.overlay {
  position: absolute;
  top: 120px;
  left: 0;
  height: calc(100% - 120px);
  z-index: 1;
  width: 200px;
}

.toggle-button {
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.topic-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.topic-list li {
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.topic-list li.active {
  background-color: #279AF1;
  color: #fff;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background-color: #AF982E;
  color: #fff;
  padding-right: 15px;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.chat-header h2 {
  font-size: 30px;
  margin-left: auto;
  margin-right: 3px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.message-sender {
  font-weight: bold;
}

.message-time {
  font-size: 12px;
  color: #999;
}

.message-body {
  background-color: #eee;
  padding: 5px;
  border-radius: 5px;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
}

.chat-input input {
  flex: 1;
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
  border: none;
}

.chat-input button {
  padding-top: 8px;
  padding-bottom: 4px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 20px;
  border: none;
  background-color: #279AF1;
  color: #fff;
  cursor: pointer;
}
</style>