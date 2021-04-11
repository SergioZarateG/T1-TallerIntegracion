<template>
    <div>
        <b-card
            v-bind:img-src="foto[$route.params.name]"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 25rem; text-align:center; margin: 20px auto;"
            class="mb-2"
            border-variant="primary"
            >
            <b-card-body>
                <b-card-title>{{$route.params.name}}</b-card-title>
                <b-card-sub-title class="mb-2">Season {{$route.params.id}}</b-card-sub-title>
            </b-card-body>
            <b-list-group flush  v-for="episode in dic_episodes[$route.params.id]" v-bind:key="episode.id">
                <b-list-group-item>
                    <b-link :to="{name: 'Episodes', params: {id: episode.episode_id}}" class="card-link"> {{episode.episode}}. {{episode.title}}</b-link>
                </b-list-group-item>
            </b-list-group>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Season',
    data () {
        return {
            dic_episodes: {},
            foto: {
                'Breaking Bad':  "https://i0.wp.com/www.yentelman.com/wp-content/uploads/2015/03/Breaking-Bad.jpg?fit=1600%2C900&ssl=1",
                'Better Call Saul': "https://storage.googleapis.com/lanacion-media-storage/2021/02/c0a7cc92-better.jpg"
            },
        };
    },
    created () {
        var name = this.$route.params.name;
        var name = name.replaceAll(' ', '+');
        axios.get('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series='+name).then(res => {
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
            this.dic_episodes = episodes;
        });
    }
}
</script>