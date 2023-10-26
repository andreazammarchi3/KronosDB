<script>
import {defineComponent} from "vue";
import axios from "axios";
import {BASE_URL} from "@/main";
import io from "socket.io-client";

export default defineComponent({
  name: "ModalAddTicket",
  components: {},
  data() {
    return {
      clients: [],
      technicians: [],
      socket: io(BASE_URL),
      username: null
    };
  },
  methods: {
    getClients() {
      axios.get(`${BASE_URL}/allClients`).then(response => {
        this.clients = response.data
      }).catch(error => {
        alert(error);
      })
    },
    getTechnicians() {
      axios.get(`${BASE_URL}/allTechnicians`).then(response => {
        this.technicians = response.data
      }).catch(error => {
        alert(error);
      })
    },
    addTicket() {
      const idClient = document.getElementById("client").value.split(" ")[0];
      const clientRequest = document.getElementById("client-request").value;
      const username = this.username === "-" ?
          '' : this.username;

      axios.post(`${BASE_URL}/addTicket`, {
            idClient,
            clientRequest,
            username
          })
          .then((response) => {
            // Reset form fields and close modal
            document.getElementById("client").selectedIndex = 0;
            document.getElementById("client-request").value = "";
            document.getElementById("technician").selectedIndex = 0;
            document.getElementById("closeBtn").click();

            alert("Ticket creato con successo");
          })
          .catch((error) => {
            alert(error);
          });
    },
    showAlert() {
      this.showAlertBool = true;
      setTimeout(() => {
        this.showAlertBool = false;
      }, 2000);
    }
  },
  mounted() {
    this.getClients()
    this.getTechnicians()

    this.socket.on('CLIENTS', (data) => {
      this.clients = data;
    });

    this.socket.on('TECHNICIANS', (data) => {
      this.technicians = data;
    });
  }
})
</script>

<template>
  <div class="modal" id="addTicket">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Nuovo Ticket</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="client" class="form-label">Cliente</label>
            <select class="form-select" id="client">
              <option v-for="client in clients">{{ client.idClient }} - {{ client.society }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="client-request" class="form-label">Richiesta/segnalazione</label>
            <textarea class="form-control" id="client-request" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label for="client" class="form-label">Tecnico assegnato (facoltativo)</label>
            <select class="form-select" id="technician" v-model="this.username">
              <option :value="null">-</option>
              <option v-for="technician in technicians" :value="technician.username">{{ technician.fullName }}</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="addTicket">Apri Ticket</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeBtn">Chiudi</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

</style>