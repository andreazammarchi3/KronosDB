<script>
import { defineComponent } from "vue";
import { VueSignaturePad } from 'vue-signature-pad';

export default defineComponent({
  name: 'MySignaturePad',
  components: { VueSignaturePad },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const data = this.$refs.signaturePad.saveSignature().data;
      console.log(data);
    }
  }
});

// TODO: add this to the template
</script>

<template>
  <div class="signature-div">
    <label for="signaturePad" class="form-label mt-4">Firma del cliente</label>
    <VueSignaturePad width="400" height="100" id="signaturePad" />
    <div>
      <button class="btn btn-primary btn-sm" @click="save">Salva Firma</button>
      <button class="btn btn-secondary btn-sm" @click="undo">Cancella firma</button>
    </div>
  </div>
</template>

<style>
@import url('../../templates/style.css');

.signature-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn {
  margin: 1rem 0.5rem;
}
</style>
