<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Alert",
  props: ['message'],
  methods: {
    showAlert() {
      document.getElementById("alert").style.display = "block";
      setTimeout(() => {
        // do next line only if element exists
        if (document.getElementById("alert")) {
          document.getElementById("alert").style.display = "none";
        }
      }, 2000);
    }
  },
  mounted() {
    this.showAlert();
  }
});

</script>

<template>
  <div class="alert alert-dismissible alert-success position-fixed top-0 start-50 translate-middle-x" id="alert">
    {{ this.message }}
  </div>
</template>

<style scoped>
.alert {
  display: none;
  margin-top: 70px;
  background-color: #2ECC71;
  border-color: #27AE60;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 10px;
}
</style>