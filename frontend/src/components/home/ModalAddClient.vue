<script>
import {defineComponent} from "vue";
import axios from "axios";
import {BASE_URL} from "@/main";

export default defineComponent({
  name: "ModalAddClient",
  data() {
    return {
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
            document.getElementById("fullName").value = "";
            document.getElementById("cellphone").value = 0;
            document.getElementById("mail").value = "";
            document.getElementById("address").value = "";

            // Show alert with fade in and out
            document.getElementById("alert").style.display = "block";
            setTimeout(() => {
              document.getElementById("alert").style.display = "none";
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
          });
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
            <label class="col-form-label" for="fullName">Nome</label>
            <input type="text" class="form-control" placeholder="Cognome Nome" id="fullName">
          </div>

          <div class="form-group">
            <label class="col-form-label" for="cellphone">Telefono</label>
            <input type="number" class="form-control" placeholder="3333333333" id="cellphone">
          </div>

          <div class="form-group">
            <label class="col-form-label" for="mail">Mail</label>
            <input type="email" class="form-control" placeholder="example@example.com" id="mail">
          </div>

          <div class="form-group">
            <label class="col-form-label" for="address">Indirizzo</label>
            <input type="text" class="form-control" placeholder="Via, Numero Civico, Città" id="address">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-sm" @click="addClient">Aggiungi Cliente</button>
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" id="closeBtn">Chiudi</button>
        </div>
      </div>
    </div>
  </div>

  <div class="alert alert-dismissible alert-success position-fixed top-0 start-50 translate-middle-x" id="alert">
    Cliente aggiunto correttamente.
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

.alert {
  display: none;
  margin-top: 6rem;
}

.col-form-label, .form-control {
  line-height: 0;
}

.form-control {
  padding: 0.25rem 0;
  margin-bottom: 1rem;
}
</style>