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
      const fullName = document.getElementById("fullName").value;
      const role = document.getElementById("role").value;
      const costPerHour = document.getElementById("costPerHour").value;

      axios.post(`${BASE_URL}/addTechnician`, {
            fullName,
            role,
            costPerHour
          })
          .then((response) => {
            console.log(response.data);
            // Reset form fields and close modal
            document.getElementById("fullName").value = "";
            document.getElementById("role").selectedIndex = 0;
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
            <label class="col-form-label" for="fullName">Nome</label>
            <input type="text" class="form-control" placeholder="Cognome Nome" id="fullName">
          </div>

          <div class="form-group">
            <label for="role" class="form-label">Ruolo</label>
            <select class="form-select" id="role">
              <option value="BASE"></option>
              <option value="JUNIOR"></option>
              <option value="SENIOR"></option>
              <option value="ADMIN"></option>
            </select>
          </div>

          <div class="form-group">
            <label class="col-form-label" for="costPerHour">Prezzo all'ora</label>
            <input type="number" class="form-control" placeholder="0" id="costPerHour">
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
@import url('../../../templates/style.css');

.col-form-label, .form-control {
  line-height: 0;
}

.form-control {
  padding: 0.25rem 0;
  margin-bottom: 1rem;
}
</style>