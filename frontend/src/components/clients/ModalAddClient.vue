<script>
import {defineComponent} from "vue";
import axios from "axios";
import {BASE_URL} from "@/main";
import Alert from "@/components/Alert.vue";

export default defineComponent({
  name: "ModalAddClient",
  components: {Alert},
  data() {
    return {
      showAlertBool: false
    };
  },
  methods: {
    addClient() {
      const fullName = document.getElementById("fullName").value;
      const cellphone = document.getElementById("cellphone").value;
      const mail = document.getElementById("mail").value;
      const address = document.getElementById("address").value;

      axios.post(`${BASE_URL}/addClient`, {
            fullName,
            cellphone,
            mail,
            address
          })
          .then((response) => {
            console.log(response.data);
            // Reset form fields and close modal
            document.getElementById("fullNameClient").value = "";
            document.getElementById("cellphone").value = 0;
            document.getElementById("mail").value = "";
            document.getElementById("address").value = "";

            document.getElementById("closeBtnClient").click()

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
  }
})
</script>

<template>
  <div class="modal" id="addClient">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Nuovo Cliente</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label" for="fullNameClient">Nome</label>
            <input type="text" class="form-control" placeholder="Cognome Nome" id="fullNameClient">
          </div>

          <div class="form-group">
            <label class="form-label" for="cellphone">Telefono</label>
            <input type="number" class="form-control" placeholder="3333333333" id="cellphone">
          </div>

          <div class="form-group">
            <label class="form-label" for="mail">Mail</label>
            <input type="email" class="form-control" placeholder="example@example.com" id="mail">
          </div>

          <div class="form-group">
            <label class="form-label" for="address">Indirizzo</label>
            <input type="text" class="form-control" placeholder="Via, Numero Civico, Città" id="address" autocomplete="on">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-sm" @click="addClient">Aggiungi Cliente</button>
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" id="closeBtnClient">Chiudi</button>
        </div>
      </div>
    </div>
  </div>

  <Alert v-if="showAlertBool" :message="'Cliente aggiunto correttamente'"></Alert>
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

.form-control {
  margin-top: 10px;
  margin-bottom: 10px;
  color: #023047;
}

.form-control:focus {
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