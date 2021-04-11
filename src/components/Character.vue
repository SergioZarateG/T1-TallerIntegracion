<template>
    <div v-if="info_character != null">
        <b-card
            no-body
            tag="article"
            style="max-width: 30rem; margin: 20px auto; text-align: left;"
            class="mb-2"
            img-top
            >
            <b-card-img v-bind:src="info_character.img" alt="Image" bottom></b-card-img>
            <b-card-body>
                <b-card-title>{{info_character.name}}</b-card-title>
                <b-card-sub-title class="mb-2">Más conocido como {{info_character.nickname}}</b-card-sub-title>
                <b-card-text>
                    <strong id="dates">Personaje de:</strong> {{info_character.category}}
                </b-card-text>
                <b-card-text>
                    <strong id="dates">Estado: </strong> {{info_character.status}}
                </b-card-text>
                <b-card-text>
                    <strong id="dates">Actor/Actriz:</strong> {{info_character.portrayed}}
                </b-card-text>
                <b-card-text>
                    <strong id="dates">Ocupación: </strong>
                    <span v-for="ocup in info_character.occupation" v-bind:key="ocup">
                        <span> {{ocup}};</span>
                    </span>
                </b-card-text>
                <hr>
                <b-card-text>
                    <strong id="dates">Apariciones Breaking Bad: </strong>
                    <span v-for="temp in info_character.appearance" v-bind:key="temp">
                        <span>
                            <b-link :to="{name: 'Season_series', params: { id: temp, name: 'Breaking Bad'}}" class="card-link"> Season {{temp}};</b-link>
                        </span>
                    </span>
                </b-card-text>
                <b-card-text>
                    <strong id="dates">Apariciones Better Call Saul: </strong>
                    <span v-for="temp in info_character.better_call_saul_appearance" v-bind:key="temp">
                        <span>
                            <b-link :to="{name: 'Season_series', params: { id: temp, name: 'Better Call Saul'}}" class="card-link"> Season {{temp}};</b-link>
                        </span>
                    </span>
                </b-card-text>
                <hr>
                <b-card-text>
                    <strong id="dates">Citas del actor: </strong>
                    <b-carousel
                        v-if="list_quotes.length != 0"
                        id="carousel-1"
                        v-model="slide"
                        :interval="4000"
                        controls
                        indicators
                        background="#ababab"
                        img-width="100"
                        img-height="50"
                        style="text-shadow: 1px 1px 2px #333;"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd"
                        >
                        <b-carousel-slide
                            v-for="(quote, index) in list_quotes"
                            v-bind:key="index"
                            v-bind:caption="quote.series"
                            v-bind:text="quote.quote"
                            img-src="https://image.freepik.com/foto-gratis/textura-negra-fondo_1160-614.jpg"
                            style="height: 400px auto;"
                        ></b-carousel-slide>
                    
                    </b-carousel>
                    <span v-if="list_quotes.length == 0">El autor no tiene citas registradas</span>
                </b-card-text>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Personaje',
    data() {
        return {
            info_character: {},
            list_quotes: [],
            slide: 0,
            sliding: null,
            error: false
        }
    },
    created() {
        var name = this.$route.params.name;
        var name = name.replaceAll(' ', '+');
        axios.get('https://tarea-1-breaking-bad.herokuapp.com/api/characters?name='+name).then(res => {
            this.info_character = res.data[0];
        }).catch(err => {
            console.log(err);
            this.error = true;
        });
        axios.get('https://tarea-1-breaking-bad.herokuapp.com/api/quote?author='+name).then(res => {
            this.list_quotes = res.data;
            console.log(res.data);
        }).catch(err => {
            console.log(err);
            this.error = true;
        });
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
}
</script>