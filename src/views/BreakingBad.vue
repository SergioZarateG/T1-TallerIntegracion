<template>
    <div>
        <ul>
            <b-card
            title="Breaking Bad"
            img-src="https://i0.wp.com/www.yentelman.com/wp-content/uploads/2015/03/Breaking-Bad.jpg?fit=1600%2C900&ssl=1"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 25rem; text-align:center;"
            class="mb-2"
            >
                <div v-for="season in temporadas_BB" v-bind:key="season">
                    <b-dropdown id="dropdown-right" right block class="m-md-2">
                        <template #button-content>
                            Temporada {{season}}
                        </template>
                        <div  v-for="episode in episodes_BB[season]" v-bind:key="episode.id">
                            <b-dropdown-item :to="{name: 'Episodes', params: {id: episode.episode_id}}">{{episode.episode}}. {{episode.title}}</b-dropdown-item>
                        </div>
                    </b-dropdown>
                </div>
            </b-card>
        </ul>
        <ul class="rigth">
            <b-card
            title="Better Call Soul"
            img-src="https://storage.googleapis.com/lanacion-media-storage/2021/02/c0a7cc92-better.jpg"
            img-alt="Image2"
            img-top
            tag="article"
            style="max-width: 25rem; text-align:center;"
            class="mb-2"
            >
                <div v-for="season in temporadas_BCS" v-bind:key="season" style="text-align:left;">
                    <b-dropdown id="dropdown-right" right block class="m-md-2">
                        <template #button-content>
                            Temporada {{season}}
                        </template>
                        <div  v-for="episode in episodes_BCS[season]" v-bind:key="episode.id">
                            <b-dropdown-item :to="{name: 'Episodes', params: {id: episode.episode_id}}">{{episode.episode}}. {{episode.title}}</b-dropdown-item>
                        </div>
                    </b-dropdown>
                </div>
            </b-card>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Series',
    data() {
        return {
            episodes_BB: null,
            temporadas_BB: null,
            episodes_BCS: null,
            temporadas_BCS: null,
            error: false,
        };
    },
    created() {
            axios.get('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad').then( res => {
                const seasons = [];
                const episodes = {};
                res.data.forEach( function(episode) {
                    if (!(seasons.includes(episode.season))) {
                        seasons.push(episode.season);
                        if (!(Object.keys(episodes).includes(episode.season))){
                            episodes[episode.season] = [];
                        }
                    }
                    episodes[episode.season].push(episode);
                });
                this.temporadas_BB = seasons;
                this.episodes_BB = episodes;
            }).catch(err => {
                console.log(err);
                this.error = true;
            });
           axios.get('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul').then( res => {
                const seasons = [];
                const episodes = {};
                res.data.forEach( function(episode) {
                    if (!(seasons.includes(episode.season))) {
                        seasons.push(episode.season);
                        if (!(Object.keys(episodes).includes(episode.season))){
                            episodes[episode.season] = [];
                        }
                    }
                    episodes[episode.season].push(episode);
                });
                this.temporadas_BCS = seasons;
                this.episodes_BCS = episodes;
            }).catch(err => {
                console.log(err);
                this.error = true;
            }); 


    }
}
</script>
<style>
#on {
    color:blue;
}
ul{
    display: inline-grid;
    margin: 20px;
    position: relative;
}
.rigth {
    float: right;
    padding-right: 40px;
}
</style>