<script>
import {defineComponent} from "vue";
import axios from "axios";
import {BASE_URL} from "@/main";

export default defineComponent({
  name: "ModalAddTicket",
  data() {
    return {
      clients: [],
      technicians: []
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

            // Show alert with fade in and out
            document.getElementById("alertTicket").style.display = "block";
            setTimeout(() => {
              if (document.getElementById("alertTicket")) {
                document.getElementById("alertTicket").style.display = "none";
              }
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
          });
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

  <div class="alert alert-dismissible alert-success position-fixed top-0 start-50 translate-middle-x" id="alertTicket">
    Ticket creato correttamente.
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

.alert {
  display: none;
  margin-top: 6rem;
}

.form-label {
  line-height: 0;
}

.form-control, .form-select {
  padding: 0.25rem 0;
  margin-bottom: 1rem;
}
</style>