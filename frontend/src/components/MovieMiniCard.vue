<script>
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
    name: "MovieMiniCard",
    props:['id'],
    data(){
        return {
            movie: {}
        }
    },
    methods:{
        getMovie(id){
           axios.get('http://localhost:3000/movies/'+id).then(res=>{
               const movie = res.data
               if(movie.poster!=null || movie.poster!==""){
                   movie.poster = movie.poster.replace("http://ia.media-imdb.com/","https://m.media-amazon.com/");
               }else{
                   movie.poster = "https://www.stillisolutions.com/wp-content/uploads/2017/09/no-image-box-300x155.png";
               }
               this.movie = movie;
           })
        },
        replaceByDefault(event) {
            event.target.src = "https://www.stillisolutions.com/wp-content/uploads/2017/09/no-image-box-300x155.png"
        }
    },
    mounted(){
        this.getMovie(this.id);
    }
})
</script>

<template>
    <div class="filmCard">
      <div class="filmCardImg">
          <img alt="" :src="movie.poster" @error="replaceByDefault">
      </div>
      <div class="filmCardTxt">
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.plot}}</p>
    </div>
  </div>

</template>

<style>

</style>