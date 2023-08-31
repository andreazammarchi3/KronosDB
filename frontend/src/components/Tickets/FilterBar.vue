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

    <input class="form-control" id="searchBox" type="search" placeholder="Cerca cliente" v-model="searchTerm">
    <button class="btn btn-primary search-btn" type="submit" @click="search">Cerca</button>
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
  width: 15rem;
}

.filter-bar > * {
  margin: 0 0.5rem;
}

.form-control {
  width: 15rem;
}

.search-btn {
  margin-left: 0;
}

@media screen and (max-width: 644px) {
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