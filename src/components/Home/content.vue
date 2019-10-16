<template>
    <div class="container">
        <div class="home_container">
            <md-card v-for="(post,index) in posts" :key="index">

                <md-card-media md-ratio="4:3">
                    <img :src="post.img"/>
                </md-card-media>

                <md-card-header>
                    <h2 class="title">{{ post.title }}</h2>
                    <div class="md-subhead">
                        <div>{{ post.description }}</div>
                    </div>
                </md-card-header>


                <md-card-actions>
                    <app-button
                            type="link"
                            :linkTo="/post/ + post.id"
                            :addClass="['small_link']"
                    >
                        See review
                    </app-button>
                </md-card-actions>

            </md-card>
        </div>
        <div class="load_more">
            <app-button
                    type="btn"
                    :addClass="['small_link']"
                    :action="loadMore"
            >
                Load more
            </app-button>
        </div>
    </div>
</template>


<script>
    // import posts from '../../assets/posts.js';

    export default {
        computed:{
            posts(){
                return this.$store.getters['post/getAllPosts']
            }
        },
        methods:{
            loadMore(){
                this.$store.dispatch('post/getAllPosts',{
                    limit: this.posts.length + 3
                })
            }
        },
        created() {
            this.$store.dispatch('post/getAllPosts',{
                limit:3
            });
        }
    }
</script>
