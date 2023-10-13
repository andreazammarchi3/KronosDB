<script>
import {defineComponent} from "vue";
import axios from "axios";
import {BASE_URL} from "@/main";
import Alert from "@/components/Alert.vue";
import sha256 from "crypto-js/sha256";
import io from "socket.io-client";

export default defineComponent({
  name: "ModalAddTechnician",
  components: {Alert},
  data() {
    return {
      technicians: [],
      admin: null,
      showAlertBool: false,
      socket: io(BASE_URL),
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
      const password = sha256(document.getElementById("password").value.trim()).toString();
      const admin = document.getElementById("admin").checked;

      axios.post(`${BASE_URL}/addTechnician`, {
            fullName,
            password,
            admin
          })
          .then((response) => {
            console.log(response.data);
            // Reset form fields and close modal
            document.getElementById("fullNameTechnician").value = "";
            document.getElementById("password").value = "";
            document.getElementById("admin").checked = false;

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

    this.socket.on('TECHNICIANS', (data) => {
      this.technicians = data;
    });
  },
  computed: {
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
            <label class="form-label" for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" id="password">
          </div>

          <div class="form-group">
            <input class="form-check-input" type="checkbox" value="" id="admin">
            <label class="form-check-label" for="admin">Admin</label>
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