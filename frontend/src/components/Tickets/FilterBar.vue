<script>
export default {
  name: 'FilterBar',
  data() {
    return {
      sortBy: 'openDateMinToMax',
      closed: true
    }
  },
  watch: {
    sortBy() {
      this.$emit('sort-by', this.sortBy)
    },
    closed() {
      this.$emit('closed', this.closed)
    }
  }
}
</script>

<template>
  <div class="filter-bar">
    <select class="form-select" id="sort-by" v-model="sortBy">
      <option value="openDateMinToMax">Dal meno recente</option>
      <option value="openDateMaxToMin">Dal più recente</option>
      <option value="clientFullNameMinToMax">Per cliente (A-Z)</option>
      <option value="clientFullNameMaxToMin">Per cliente (Z-A)</option>
    </select>

    <div class="btn-group" role="group">
      <input type="checkbox" class="btn-check" id="closed" checked autocomplete="off" v-model="closed">
      <label class="btn btn-success" for="closed">Chiusi</label>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
}

.form-select {
  max-width: 15rem;
}

.btn-group {
  margin-left: 1rem;
}
</style>