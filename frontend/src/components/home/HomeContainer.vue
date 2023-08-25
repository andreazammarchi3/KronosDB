<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "HomeContainer",
  data() {
    return {
      showModal: false
    };
  }
})
</script>

<template>
    <div class="btn-container">
      <button class="btn btn-warning btn-with-margin" data-bs-toggle="modal" data-bs-target="#modalExample">Nuovo Ticket</button>
      <router-link class="btn btn-warning btn-with-margin" :to="{path: '/tickets'}">Elenco Ticket</router-link>

      <div class="modal" id="modalExample">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Save changes</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.btn-with-margin {
  margin: 0.5rem 1rem;
}

</style>
