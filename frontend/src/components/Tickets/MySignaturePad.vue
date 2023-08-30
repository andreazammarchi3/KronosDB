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
    <div>
      <button type="button" class="btn btn-primary btn-sm" @click="saveSignature">Salva</button>
      <button type="button" class="btn btn-secondary btn-sm" @click="clearSignature">Cancella</button>
    </div>
  </div>
</template>

<style>
@import url('../../../templates/style.css');

.signature-pad {
  border: 1px solid #000;
}

.btn {
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
}

</style>
