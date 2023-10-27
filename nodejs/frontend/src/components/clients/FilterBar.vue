<script>
export default {
  name: 'FilterBar',
  data() {
    return {
      sortBy: 'clientIdMinToMax',
      searchTerm: ''
    }
  },
  watch: {
    sortBy() {
      this.$emit('sort-by', this.sortBy)
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
    <select class="form-select" id="sort-by" v-model="sortBy">
      <option value="clientIdMinToMax">Per ID cliente (crescente)</option>
      <option value="clientIdMaxToMin">Per ID cliente (decrescente)</option>
      <option value="clientSocietyMinToMax">Per società (A-Z)</option>
      <option value="clientSocietyMaxToMin">Per società (Z-A)</option>
    </select>

    <input class="form-control" id="searchBox" type="search" placeholder="Cerca cliente" v-model="searchTerm">
    <button class="btn btn-primary" type="submit" @click="search">Cerca</button>
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

.form-control, .form-select {
  width: 200px;
  margin-right: 15px;
}

.btn {
  margin-left: 0;
}

@media screen and (max-width: 543px) {
  .filter-bar {
    flex-direction: column;
  }
}

</style>