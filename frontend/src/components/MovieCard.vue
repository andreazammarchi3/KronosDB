<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MovieCard",
  props:['movie'],
  methods:{
    replaceByDefault(event) {
      event.target.src = "https://www.stillisolutions.com/wp-content/uploads/2017/09/no-image-box-300x155.png"
    }
  }
})
</script>

<template>
  <div class="card" >
    <div class="row no-gutters">
      <div class="col-md-4">
        <img v-if="movie.poster" v-bind:src=movie.poster class="card-img" alt="" @error="replaceByDefault">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p v-if="movie.hasOwnProperty('imdb') && movie.imdb.rating != null" class="card-text">{{movie.imdb.rating}}/10</p>
          <p class="card-text">{{ movie.plot }}</p>
          <!--<p class="card-text">Release date: {{ movie.released ? movie.released.substring(0,10) : 'N/A' }}</p>-->
          <p class="card-text">Release date: {{ movie.released ? movie.released.substring(0,10) : 'N/A' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>