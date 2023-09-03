<script>
export default {
  name: 'FilterBar',
  data() {
    return {
      sortBy: 'clientFullNameMinToMax',
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
      <option value="clientFullNameMinToMax">Per nome (A-Z)</option>
      <option value="clientFullNameMaxToMin">Per nome (Z-A)</option>
    </select>

    <input class="form-control" id="searchBox" type="search" placeholder="Cerca cliente" v-model="searchTerm">
    <button class="btn btn-primary" type="submit" @click="search">Cerca</button>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.form-select, .form-control {
  width: 250px;
  color: #023047;
}

.form-control:focus, .form-select:focus {
  box-shadow: 0 0 0 2px #219EBC;
  color: #023047;
}

.filter-bar > * {
  margin: 0 0.5rem;
}

.btn-primary {
  width: 80px;
  height: 38px;
  background-color: #FFB703;
  border: none;
  color: #023047;
  font-weight: bold;
}

.btn-primary:hover, .btn-primary:focus, .btn-primary:active {
  color: #023047;
  background-color: #FB8500;
  cursor: pointer;
}

@media screen and (max-width: 543px) {
  .filter-bar {
    flex-wrap: wrap;
  }

  .filter-bar > * {
    margin: 0.5rem;
  }

  .form-control {
    width: 15rem;
    margin-left: 0.5rem;
  }
}

</style>