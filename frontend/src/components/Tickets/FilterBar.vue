<script>
export default {
  name: 'FilterBar',
  data() {
    return {
      sortBy: 'openDateMinToMax'
    }
  },
  watch: {
    sortBy() {
      this.$emit('sort-by', this.sortBy)
    }
  }
}
</script>

<template>
  <div class="filter-bar">
    <label for="sort-by">Sort by:</label>
    <select id="sort-by" v-model="sortBy">
      <option value="openDateMinToMax">Dal meno recente</option>
      <option value="openDateMaxToMin">Dal più recente</option>
      <option value="clientFullNameMinToMax">Per cliente (A-Z)</option>
      <option value="clientFullNameMaxToMin">Per cliente (Z-A)</option>
    </select>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

label {
  margin-right: 0.5rem;
}
</style>