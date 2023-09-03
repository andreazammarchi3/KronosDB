<script>
import {defineComponent} from "vue";
import axios from "axios";
import {BASE_URL} from "@/main";
import Alert from "@/components/Alert.vue";

export default defineComponent({
  name: "ModalAddTechnician",
  components: {Alert},
  data() {
    return {
      showAlertBool: false
    };
  },
  methods: {
    addTechnician() {
      const fullName = document.getElementById("fullNameTechnician").value;
      const role = document.getElementById("roleAdd").value;
      const costPerHour = document.getElementById("costPerHour").value;

      axios.post(`${BASE_URL}/addTechnician`, {
            fullName,
            role,
            costPerHour
          })
          .then((response) => {
            console.log(response.data);
            // Reset form fields and close modal
            document.getElementById("fullNameTechnician").value = "";
            document.getElementById("roleAdd").selectedIndex = -1;
            document.getElementById("costPerHour").value = 0;

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
            <select class="form-select" id="roleAdd">
              <option value="BASE">BASE</option>
              <option value="JUNIOR">JUNIOR</option>
              <option value="SENIOR">SENIOR</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="costPerHour">Prezzo all'ora</label>
            <input type="number" class="form-control" placeholder="0" id="costPerHour" min="0">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-sm" @click="addTechnician">Aggiungi Tecnico</button>
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" id="closeBtnTechnician">Chiudi</button>
        </div>
      </div>
    </div>
  </div>

  <Alert v-if="showAlertBool" :message="'Tecnico aggiunto correttamente'"></Alert>
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