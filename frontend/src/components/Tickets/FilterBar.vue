<script>
export default {
  name: 'FilterBar',
  data() {
    return {
      sortBy: 'openDateMinToMax',
      closed: true,
      searchTerm: ''
    }
  },
  watch: {
    sortBy() {
      this.$emit('sort-by', this.sortBy)
    },
    closed() {
      this.$emit('closed', this.closed)
    }
  },
  computed: {
  },
  methods: {
    search() {
      this.$emit('search', this.searchTerm)
    }
  },
  mounted() {
    const inputBox = document.getElementById('searchBox');

    inputBox.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default "Enter" key action
      }
    });
  }
}
</script>

<template>
  <div class="filter-bar">
    <div class="btn-group" role="group">
      <input type="checkbox" class="btn-check" id="closed" checked autocomplete="off" v-model="closed">
      <label class="btn btn-success" for="closed">Chiusi</label>
    </div>

    <select class="form-select" id="sort-by" v-model="sortBy">
      <option value="openDateMinToMax">Dal meno recente</option>
      <option value="openDateMaxToMin">Dal più recente</option>
      <option value="clientFullNameMinToMax">Per cliente (A-Z)</option>
      <option value="clientFullNameMaxToMin">Per cliente (Z-A)</option>
    </select>

    <input class="form-control" id="searchBox" type="search" placeholder="Cerca cliente" v-model="searchTerm">
    <button class="btn btn-primary search-btn" type="submit" @click="search">Cerca</button>
  </div>
</template>

<style scoped>
@import url('../../../templates/style.css');

.filter-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.btn-check:checked {
  background-color: #27AE60 !important;
}

.form-control, .form-select {
  width: 200px;
  margin-right: 15px;
}

.btn {
  margin-left: 0 !important;
  margin-right: 15px !important;
}

@media screen and (max-width: 543px) {
  .filter-bar {
    flex-direction: column;
  }
}

</style>