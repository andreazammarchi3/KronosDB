<script>
import {defineComponent} from 'vue'
import axios from "axios";
import MovieCard from "@/components/MovieCard.vue";


export default defineComponent({
    name: "MoviesPage",
    components: {MovieCard},
    data() {
        return {
            movies: []
        }
    },
    methods: {
        listMovies(){

            axios.get("http://localhost:3000/movies")
                .then(response => {
                    const movies = response.data;
                    movies.forEach((movie)=>{
                        if(movie.poster!=null){
                            movie.poster = movie.poster.replace("http://ia.media-imdb.com/","https://m.media-amazon.com/")
                        }
                        else{
                            movie.poster = "https://www.stillisolutions.com/wp-content/uploads/2017/09/no-image-box-300x155.png";
                        }
                    })
                    this.movies = movies;
                })
                .catch(error => {
                    console.log(error);
                })

        }

    },
    mounted(){
        this.listMovies();
    }
})
</script>

<template>
    <section>
    <div class="row">
        <div class="col">
            <MovieCard v-for="movie in movies" :movie="movie" :key="movie.id"></MovieCard>
        </div>
    </div>
    </section>
</template>

<style scoped>

</style>