<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "NavButton",
    props:['routeName'],
    emits: ['counter-clicked'],
    data(){
        return {
            count: 0
        }
    },
    methods:{
        onClicked(){
            this.count++;
            this.$emit('counter-clicked');
        }
    }
})
</script>

<template>
    <li class="nav-item" @click="onClicked">
        <RouterLink class="nav-link" :to="{name: routeName}">{{ routeName }} (Count: {{count}} )</RouterLink>
    </li>
</template>

<style scoped>

</style>