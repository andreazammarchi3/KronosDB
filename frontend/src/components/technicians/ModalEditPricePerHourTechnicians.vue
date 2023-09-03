<script>
import {defineComponent} from "vue";
import axios from "axios";
import {BASE_URL} from "@/main";
import Alert from "@/components/Alert.vue";

export default defineComponent({
  name: "ModalEditPricePerHourTechnicians",
  components: {Alert},
  data() {
    return {
      technicians: [],
      showAlertBool: false
    };
  },
  methods: {
    editPrice() {
      const junior = document.getElementById("junior").value;
      const senior = document.getElementById("senior").value;
      const admin = document.getElementById("admin").value;

      for (const technician of this.technicians) {
        if (technician.role === "JUNIOR") {
          axios.post(BASE_URL + '/updateTechnician:' + technician.idTechnician, {
            costPerHour: junior
          }).then((response) => {
            console.log(response);
          }).catch((error) => {
            console.log(error);
          });
        } else if (technician.role === "SENIOR") {
          axios.post(BASE_URL + '/updateTechnician:' + technician.idTechnician, {
            costPerHour: senior
          }).then((response) => {
            console.log(response);
          }).catch((error) => {
            console.log(error);
          });
        } else if (technician.role === "ADMIN") {
          axios.post(BASE_URL + '/updateTechnician:' + technician.idTechnician, {
            costPerHour: admin
          }).then((response) => {
            console.log(response);
          }).catch((error) => {
            console.log(error);
          });
        }
      }
      document.getElementById("closeBtnEditPrice").click();
    },
    showAlert() {
      this.showAlertBool = true;
      setTimeout(() => {
        this.showAlertBool = false;
      }, 2000);
    }
  },
  computed: {
    pricePerHourJunior() {
      const technician = this.technicians.filter((technician) => technician.role === "JUNIOR")[0];
      return technician ? technician.costPerHour : 0;
    },
    pricePerHourSenior() {
      const technician = this.technicians.filter((technician) => technician.role === "SENIOR")[0];
      return technician ? technician.costPerHour : 0;
    },
    pricePerHourAdmin() {
      const technician = this.technicians.filter((technician) => technician.role === "ADMIN")[0];
      return technician ? technician.costPerHour : 0;
    }
  },
  mounted() {
    axios.get(`${BASE_URL}/allTechnicians`)
        .then((response) => {
          this.technicians = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  }
})
</script>

<template>
  <div class="modal" id="editPrice" v-if="technicians">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifica prezzi orari tecnici</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="col-form-label" for="junior">JUNIOR</label>
            <input type="number" class="form-control" :value="pricePerHourJunior" id="junior" min="0">
          </div>
          <div class="form-group">
            <label class="col-form-label" for="senior">SENIOR</label>
            <input type="number" class="form-control" :value="pricePerHourSenior" id="senior" min="0">
          </div>
          <div class="form-group">
            <label class="col-form-label" for="admin">ADMIN</label>
            <input type="number" class="form-control" :value="pricePerHourAdmin" id="admin" min="0">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-sm" @click="editPrice">Modifica prezzi</button>
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" id="closeBtnEditPrice">Chiudi</button>
        </div>
      </div>
    </div>
  </div>

  <Alert v-if="showAlertBool" :message="'Prezzi modificati correttamente'"></Alert>
</template>

<style scoped>
.col-form-label, .form-control {
  line-height: 0;
}

.form-control {
  padding: 0.25rem 0;
  margin-bottom: 1rem;
}
</style>