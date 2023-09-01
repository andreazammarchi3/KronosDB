<template>
  <Header></Header>
  <div class="group-chat">
    <div class="chat-sidebar" :class="{ 'hidden': !sidebarVisible, 'overlay': sidebarOverlay }">
      <ul class="topic-list">
        <li v-for="topic in topics" :key="topic.id" :class="{ 'active': topic.id === activeTopicId }" @click="setActiveTopic(topic.id)">
          {{ topic.name }}
        </li>
      </ul>
    </div>
    <div class="chat-main">
      <div class="chat-header">
        <button class="toggle-button" v-if="sidebarToggleVisible" @click="toggleSidebar">{{ sidebarVisible ? 'Hide Topics' : 'Show Topics' }}</button>
        <h2>{{ activeTopic.name }}</h2>
      </div>
      <div class="chat-messages">
        <div v-for="message in activeTopic.messages" :key="message.id" class="message">
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
        <input type="text" v-model="newMessage" placeholder="Type your message...">
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: 'GroupChat',
  components: {Header},
  data() {
    return {
      topics: [
        { id: 1, name: 'Topic 1', messages: [
            { id: 1, sender: 'John', time: '10:00 AM', text: 'Hello everyone!' },
            { id: 2, sender: 'Mary', time: '10:05 AM', text: 'Hi John!' },
            { id: 3, sender: 'Bob', time: '10:10 AM', text: 'How are you all doing?' },
          ]},
        { id: 2, name: 'Topic 2', messages: [
            { id: 1, sender: 'John', time: '11:00 AM', text: 'Topic 2 message 1' },
            { id: 2, sender: 'Mary', time: '11:05 AM', text: 'Topic 2 message 2' },
          ]},
        { id: 3, name: 'Topic 3', messages: [
            { id: 1, sender: 'John', time: '12:00 PM', text: 'Topic 3 message 1' },
            { id: 2, sender: 'Mary', time: '12:05 PM', text: 'Topic 3 message 2' },
            { id: 3, sender: 'Bob', time: '12:10 PM', text: 'Topic 3 message 3' },
          ]},
      ],
      activeTopicId: 1,
      newMessage: '',
      sidebarVisible: true,
      sidebarToggleVisible: true,
      sidebarOverlay: false,
    }
  },
  computed: {
    activeTopic() {
      return this.topics.find(topic => topic.id === this.activeTopicId);
    },
  },
  methods: {
    setActiveTopic(topicId) {
      this.activeTopicId = topicId;
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const newId = this.activeTopic.messages.length + 1;
        const newMessage = {
          id: newId,
          sender: 'You',
          time: new Date().toLocaleTimeString(),
          text: this.newMessage.trim(),
        };
        this.activeTopic.messages.push(newMessage);
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
  },
  mounted() {
    if (sessionStorage.getItem("idTechnician") === null) {
      this.$router.push({name: "Login"});
    }
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scoped>
.group-chat {
  display: flex;
  height: 100%;
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
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1;
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
  background-color: #2F2F2F;
  color: #fff;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background-color: #2F2F2F;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  background-color: #2F2F2F;
  color: #fff;
  cursor: pointer;
}
</style>