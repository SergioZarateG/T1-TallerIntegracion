<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-container>
        <b-navbar-brand to="/"><strong>Home-Tarea1</strong></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <Search v-bind:search="todos" text="Search" @click="handleClick"></Search>
      </b-container>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import Search from './components/Search';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Search
  },
  data(){
    return {
      todos: [
      ],
      name: "",
    }
  },
  methods: {
    handleClick(info) {
      console.log(info);
      this.todos = info;
    }

  },
}
</script>

<style>
  #app{
    color:black;
  }
  *{
    box-sizing: border-box;
  }

  body{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5em;
    padding: 0;
    margin: 0;
    background: #70A063;
  }

  #main-container{
    border: solid 1px #ccc;
    width: 200px;
    margin: 100px auto;
  }
  #main-container img{
    width: 200px;
  }
  #header{
    background: #1F1F1F;
    padding: 10px;
  }
  .header_2{
    align-items: center;
    display: flex;
    position: relative;
    z-index: 0;
  }
  .header_2 .cube1 {
    height: left;
    margin-left: 20px;
  }
  .header_2 .cube1 .init{
    color: rgb(30, 83, 24);
    text-decoration: none;
    font-weight: bold;
    font-size: 35px;
  }
  .header_2 .cube1 .init:hover{
    color: white;
  }
  .header_2 .cube2{
    height: right;
    margin-right: 20px;

  }
  .header_2 .spacer{
    flex-grow: 1!important;
  }
  h2{
    padding: 0 10px;
  }
</style>
