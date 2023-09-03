<script>
import {defineComponent} from "vue";
import axios from "axios";
import {BASE_URL} from "@/main";
import Alert from "@/components/Alert.vue";

export default defineComponent({
  name: "ModalAddTicket",
  components: {Alert},
  data() {
    return {
      clients: [],
      technicians: [],
      showAlertBool: false
    };
  },
  methods: {
    getClients() {
      axios.get(`${BASE_URL}/allClients`).then(response => {
        this.clients = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getTechnicians() {
      axios.get(`${BASE_URL}/allTechnicians`).then(response => {
        this.technicians = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    addTicket() {
      const idClient = document.getElementById("client").value.split(" ")[0];
      const clientRequest = document.getElementById("client-request").value;
      const idTechnician = document.getElementById("technician").value.split(" ")[0] === "Nessuno" ?
          null : document.getElementById("technician").value.split(" ")[0];

      axios.post(`${BASE_URL}/addTicket`, {
            idClient,
            clientRequest,
            idTechnician
          })
          .then((response) => {
            console.log(response.data);
            // Reset form fields and close modal
            document.getElementById("client").selectedIndex = 0;
            document.getElementById("client-request").value = "";
            document.getElementById("technician").selectedIndex = 0;
            document.getElementById("closeBtn").click();

            this.showAlert();
          })
          .catch((error) => {
            console.log(error);
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
              <option v-for="client in clients">{{ client.idClient }} - {{ client.fullName }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="client-request" class="form-label">Richiesta/segnalazione</label>
            <textarea class="form-control" id="client-request" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label for="client" class="form-label">Tecnico assegnato (facoltativo)</label>
            <select class="form-select" id="technician">
              <option>Nessuno</option>
              <option v-for="technician in technicians">{{ technician.idTechnician }} - {{ technician.fullName }}</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-sm" @click="addTicket">Apri Ticket</button>
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" id="closeBtn">Chiudi</button>
        </div>
      </div>
    </div>
  </div>

  <Alert v-if="showAlertBool" :message="'Ticket creato correttamente'"></Alert>
</template>

<style scoped>
.modal-title {
  color: #023047;
  font-weight: bold;
}

.form-label {
  color: #023047;
  line-height: 0;
  font-weight: bold;
}

.form-control, .form-select {
  margin-top: 10px;
  margin-bottom: 10px;
  color: #023047;
}

.form-control:focus, .form-select:focus {
  box-shadow: 0 0 0 2px #219EBC;
  color: #023047;
}

.btn-primary {
  background-color: #FFB703;
  border: none;
  color: #023047;
  font-weight: bold;
}

.btn-primary:hover, .btn-primary:focus, .btn-primary:active {
  color: #023047;
  background-color: #FB8500;
  cursor: pointer;
}

.btn-primary:focus, .btn-primary:active {
  box-shadow: 0 0 0 2px #219EBC;
}

.btn-secondary {
  background-color: #8ECAE6;
  border: none;
  font-weight: normal;
}

.btn-secondary:hover, .btn-secondary:focus, .btn-secondary:active {
  background-color: #219EBC;
  cursor: pointer;
}

.btn-secondary:focus, .btn-secondary:active {
  box-shadow: 0 0 0 2px #219EBC;
}
</style>