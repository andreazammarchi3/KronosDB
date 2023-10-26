<script>
import {defineComponent} from "vue";
import axios from "axios";
import {BASE_URL} from "@/main";

export default defineComponent({
  name: "ModalAddClient",
  components: {},
  data() {
    return {
    };
  },
  methods: {
    addClient() {
      const fullName = document.getElementById("fullNameClient").value;
      const society = document.getElementById("society").value;
      const cellphone = document.getElementById("cellphone").value;
      const mail = document.getElementById("mail").value;
      const address = document.getElementById("address").value;

      axios.post(`${BASE_URL}/addClient`, {
            fullName,
            society,
            cellphone,
            mail,
            address
          })
          .then((response) => {
            // Reset form fields and close modal
            document.getElementById("fullNameClient").value = "";
            document.getElementById("society").value = "";
            document.getElementById("cellphone").value = "";
            document.getElementById("mail").value = "";
            document.getElementById("address").value = "";

            document.getElementById("closeBtnClient").click()

            alert("Cliente aggiunto con successo");
          })
          .catch((error) => {
            alert(error);
          });
    },
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
            <label class="form-label" for="society">Società</label>
            <input type="text" class="form-control" placeholder="Società" id="society">
          </div>

          <div class="form-group">
            <label class="form-label" for="cellphone">Telefono</label>
            <input type="text" class="form-control" placeholder="3333333333" id="cellphone">
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
          <button type="button" class="btn btn-primary" @click="addClient">Aggiungi Cliente</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeBtnClient">Chiudi</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');
</style>