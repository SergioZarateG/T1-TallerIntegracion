<template>
    <div v-if="inform_episode != null" style="text-align:center; margin: 20px">  
        <b-card
            no-body
            tag="article"
            style="max-width: 25rem; margin: 0px auto; text-align: left;"
            class="mb-2"
            >
            <b-card-body>
                <b-card-title>{{inform_episode.episode_id}}. {{inform_episode.title}}</b-card-title>
                <b-card-sub-title class="mb-2">{{inform_episode.series}}</b-card-sub-title>
                <b-card-text>
                    <strong id="dates">Temporada:</strong> {{inform_episode.season}}
                </b-card-text>
                <b-card-text>
                    <strong id="dates">Capítulo:</strong> {{inform_episode.episode}}
                </b-card-text>
                <b-card-text>
                    <strong id="dates">Fecha estreno:</strong> {{date}}
                </b-card-text>
                <hr>
                <b-card-text style="text-align:center;">
                    <strong id="dates">Personajes:</strong>
                </b-card-text>
                <b-card-text v-for="(name_character, index) in inform_episode.characters" v-bind:key="index" style="text-align:center;">
                    <b-link :to="{name: 'Characters', params: { name: name_character}}" class="card-link">{{index+1}}.{{name_character}}</b-link>
                </b-card-text>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'

export default {
    name: 'Episode',
    data() {
        return {
            inform_episode: null,
            date: null,
        };
    },
    created() {
        var ide = this.$route.params.id;
        axios.get('https://tarea-1-breaking-bad.herokuapp.com/api/episodes/'+ide).then( res => {
            this.inform_episode = res.data[0];
            const b = res.data[0].air_date.split('T');
            const f = b[0].split('-');

            const fecha = f[2]+'-'+f[1]+'-'+f[0];
            this.date = fecha;
        });
    }
}
</script>

<style>
#dates {
    color: #3A3A3A;
}
</style>