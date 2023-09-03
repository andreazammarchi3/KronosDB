<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import {BASE_URL} from "@/main";
import io from "socket.io-client";

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
      socket: io(BASE_URL),
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
    },
    currentSender() {
      return sessionStorage.getItem("fullName");
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
    },
    scrollToBottom() {
      const chatMessages = document.querySelector('.chat-messages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    },
    createNewChat() {
      const topic = window.prompt('Inserisci nome Topic:');
      if (topic !== null && topic.trim() !== '' && !this.chats.some(chat => chat.topic === topic.trim())) {
        const newChat = {
          topic: topic.trim(),
          messages: [],
        };
        this.chats.push(newChat);
        this.activeTopicName = newChat.topic;
        console.log(this.chats);

        axios.post(BASE_URL + '/addChat:' + topic.trim()).then(response => {
          console.log(response.data);
        }).catch(error => {
          console.log(error);
        });
      }
    }
  },
  mounted() {
    if (sessionStorage.getItem("idTechnician") === null) {
      this.$router.push({name: "Login"});
    }
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    this.getChats();
    this.getTechnicians();

    this.socket.on('CHAT', (data) => {
      this.chats = data;
      this.scrollToBottom();
    });

    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
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
      <button class="btn btn-primary" @click="createNewChat">Crea Topic</button>
    </div>
    <div class="chat-main">
      <div class="chat-header">
        <button class="btn btn-prim" v-if="sidebarToggleVisible" @click="toggleSidebar"><i class="bi bi-list"></i></button>
        <h2>{{ activeTopicName }}</h2>
      </div>
      <div class="chat-messages">
        <div v-for="message in activeChat.messages" :key="message.id" class="message">
          <div class="message-header">
            <span class="message-sender">{{ message.sender === currentSender ? 'Tu' : message.sender }}</span>
            <span class="message-time">{{ message.time }}</span>
          </div>
          <div class="message-body" :class="{'my-message-body': message.sender === currentSender}">
            {{ message.text }}
          </div>
        </div>
      </div>
      <div class="chat-input">
        <input type="text" class="form-control" id="textMsg" v-model="newMessage" placeholder="Digita messaggio..." @keyup.enter="sendMessage" autocomplete="off">
        <button @click="sendMessage" class="btn-icon"><i class="bi bi-send-fill"></i></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('../../templates/style.css');

div *:not(Header) {
  font-family: Overpass, sans-serif;
}

.group-chat {
  display: flex;
  height: calc(100vh - 60px);
}

.chat-sidebar {
  flex: 0 0 250px;
  background-color: #023047;
  padding: 10px;
  transition: transform 0.3s ease-in-out;
  color: #FFFFFF;
  font-size: 20px;
}

.chat-sidebar.hidden {
  transform: translateX(-250px);
}

.chat-sidebar.overlay {
  position: absolute;
  top: 120px;
  left: 0;
  height: calc(100% - 120px);
  z-index: 1;
  width: 250px;
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
  background-color: #FFB703;
  color: #023047;
  font-weight: bold;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background-color: #FFB703;
  color: #fff;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.chat-header h2 {
  font-size: 30px;
  margin-left: auto;
  margin-right: 0;
  padding-top: 10px;
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

.my-message-body {
  background-color: #27AE60;
  color: #fff;
}

.chat-input {
  display: flex;
  align-items: flex-end;
  justify-content: center;
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
  padding: 8px 10px 4px;
  border-radius: 20px;
  border: none;
  background-color: #27AE60;
  color: #fff;
  cursor: pointer;
}

h2 {
  font-weight: bold;
}

.form-control {
  margin-bottom: 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
}

.btn-prim {
  background-color: #023047;
  border: none;
  color: #FFFFFF;
  height: 38px !important;
  width: 38px !important;
}

.btn-prim:hover, .btn-prim:focus, .btn-prim:active, .btn-prim:active:focus, .btn-prim:active:hover {
  background-color: #023047;
  border: none;
  color: #FFFFFF;
  height: 38px !important;
  width: 38px !important;
}

.btn-icon:hover, .btn-icon:focus, .btn-icon:active {
  box-shadow: none;
  border: none;
}

.bi-list {
  font-size: 20px;
}
</style>