<template>
    <div id="search-container">
        <!--<input type="text" class="text" placeholder="Buscar Personaje" v-model="query" v-on:input="$emit('query-change', query)">-->
        <b-nav-form><b-form-input size="sm" class="mr-sm-2" placeholder="Buscar Personaje" v-on:keyup.enter="handleClick" type="text" v-model="query"/>
        <b-button  @click="handleClick" v-b-modal.modal-1>{{text}}</b-button></b-nav-form>
        <b-modal id="modal-1" title="Resultados Búsqueda">
            <p v-for="(character, index) in search" v-bind:key="index" class="my-4">
                <b-link :to="{name: 'Characters', params: { name: character.name}}" class="card-link">{{index+1}}.{{character.name}}</b-link>
            </p>
        </b-modal>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'Search',
    props: {
        text: String,
        search: Array,
    },
    data(){
        return {
            query:'',
            result: [],
            error: false,
            count: 10,
        }
    },
    methods: {
        handleClick() {
            const name = this.query.replaceAll(" ", "+");
            axios.get('https://tarea-1-breaking-bad.herokuapp.com/api/characters?name='+name+'&limit=10&offset=0').then(res => {
                this.$emit("click", res.data); 
                console.log(res.data);
            }).catch(err => {
                console.log(err);
                this.error = true;
            });
        }
    }
}
</script>

<style>
    #search_container{
        padding: 10px;
        width: 100%;
        outline: none;
    }
    input.text{
        background: rgb(177, 205, 231);
        border: 1px solid white;
        border-radius: 8px 8px 8px 8px;
        color: black;
        font-size: 15px;
        padding: 5px;
        
    }
</style>