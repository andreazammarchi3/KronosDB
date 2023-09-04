<script>
import {defineComponent} from "vue";
import axios from "axios";
import {BASE_URL} from "@/main";
import Alert from "@/components/Alert.vue";
import sha256 from "crypto-js/sha256";

export default defineComponent({
  name: "ModalAddTechnician",
  components: {Alert},
  data() {
    return {
      technicians: [],
      role: null,
      showAlertBool: false
    };
  },
  methods: {
    getAllTechnicians() {
      axios.get(`${BASE_URL}/allTechnicians`).then((response) => {
        this.technicians = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    addTechnician() {
      const fullName = document.getElementById("fullNameTechnician").value;
      const role = document.getElementById("roleAdd").value;
      const costPerHour = document.getElementById("costPerHour").value;
      const password = sha256(document.getElementById("password").value.trim());

      axios.post(`${BASE_URL}/addTechnician`, {
            fullName,
            role,
            costPerHour,
            password
          })
          .then((response) => {
            console.log(response.data);
            // Reset form fields and close modal
            document.getElementById("fullNameTechnician").value = "";
            document.getElementById("roleAdd").selectedIndex = -1;
            document.getElementById("costPerHour").value = 0;
            document.getElementById("password").value = "";

            document.getElementById("closeBtnTechnician").click()

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
    this.getAllTechnicians();
  },
  computed: {
    getCostPerHourFromRole() {
      this.getAllTechnicians();
      return this.technicians.find(t => t.role === this.role).costPerHour;
    }
  }
})
</script>

<template>
  <div class="modal" id="addTechnician">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Nuovo Tecnico</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label" for="fullNameTechnician">Nome</label>
            <input type="text" class="form-control" placeholder="Cognome Nome" id="fullNameTechnician">
          </div>

          <div class="form-group">
            <label for="roleAdd" class="form-label">Ruolo</label>
            <select class="form-select" id="roleAdd" v-model="this.role">
              <option value="BASE">BASE</option>
              <option value="JUNIOR">JUNIOR</option>
              <option value="SENIOR">SENIOR</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div v-if="this.technicians && this.role" class="form-group">
            <label class="form-label" for="costPerHour">Prezzo all'ora</label>
            <input type="number" class="form-control" placeholder="0" id="costPerHour" min="0" readonly :value="this.getCostPerHourFromRole">
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" id="password">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="addTechnician">Aggiungi Tecnico</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeBtnTechnician">Chiudi</button>
        </div>
      </div>
    </div>
  </div>

  <Alert v-if="showAlertBool" :message="'Tecnico aggiunto correttamente'"></Alert>
</template>

<style scoped>
@import url('../../../templates/style.css');
</style>