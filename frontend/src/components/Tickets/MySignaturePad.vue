<script>
import { defineComponent } from "vue";
import { VueSignaturePad } from 'vue-signature-pad';

export default defineComponent({
  name: 'MySignaturePad',
  components: { VueSignaturePad },
  methods: {
    saveSignature(event) {
      event.preventDefault();
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if (!isEmpty) {
        this.$emit('save', data);
      }
    },
    clearSignature(event) {
      event.preventDefault();
      this.$refs.signaturePad.clearSignature();
    }
  }
});
</script>

<template>
  <div class="signature-div">
    <label class="form-label mt-4">Firma del cliente</label>
    <VueSignaturePad class="signature-pad" ref="signaturePad" width="400px" height="100px"/>
    <button type="button" class="btn btn-first" @click="saveSignature">Salva firma</button>
    <button type="button" class="btn btn-second" @click="clearSignature">Pulisci firma</button>
  </div>
</template>

<style>
@import url('../../../templates/style.css');

.signature-pad {
  background-color: #FFFFFF;
  border-radius: 10px;
}

.btn {
  border: none !important;
  height: 38px !important;
  margin: 5px 10px 5px 0 !important;
  padding: 5px 10px !important;
  text-align: center !important;
  align-items: center !important;
}

.btn:focus, .btn:active {
  box-shadow: 0 0 0 2px #219EBC !important;
}

.btn:hover {
  cursor: pointer !important;
}

.btn:disabled {
  cursor: not-allowed !important;
}

.btn-first, .btn-first:disabled {
  background-color: #FFB703 !important;
  color: #023047 !important;
  font-weight: bold !important;
}

.btn-first:hover, .btn-first:focus, .btn-first:active {
  background-color: #FB8500 !important;
  color: #023047 !important;
}

.btn-second, .btn-second:disabled {
  background-color: #219EBC !important;
  font-weight: bold !important;
}

.btn-second:hover, .btn-second:focus, .btn-second:active {
  background-color: #023047 !important;
  color: #FFFFFF !important;
  font-weight: normal !important;
}

</style>
