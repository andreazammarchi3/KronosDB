<script>
import {defineComponent} from 'vue'
import NavButton from "@/components/NavButton.vue";

export default defineComponent({
    name: "NavBar",
    components: {NavButton},
    data(){
        return {
            counter: 0
        }
    },
    methods:{
        onChildClicked(){
            this.counter++;
        }
    }
})
</script>

<template>
    <nav class="navbar navbar-light bg-light navbar-expand-lg">
        <div class="container container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
<!--                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/movies">Movies</RouterLink>
                    </li>-->
                    <NavButton route-name="Home" @counter-clicked="onChildClicked"></NavButton>
                    <NavButton route-name="Movies" @counter-clicked="onChildClicked"></NavButton>

                </ul>
                <div>
                    Total click: {{ counter }}
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>