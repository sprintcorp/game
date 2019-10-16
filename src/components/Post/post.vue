<template>
    <div class="container post_container">
        <div class="top" v-if="post">
            <div class="post_header">
                <h1>{{post.title}}</h1>
                <div
                    class="post_img"
                    :style="{'background':`url(${post.img})`}"
                ></div>
            </div>
            <div class="post_content">
                <div v-html="post.content"></div>
            </div>
            <div class="post_rating">
                Ratings : <span>{{post.rating}} / 5</span>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        computed:{
          post(){
              return this.$store.getters['post/getPost'];
          }
        },
        created(){
            let id = this.$route.params.id;
            this.$store.dispatch('post/getSinglePost',id);
        },
        destroyed() {
            this.$store.commit('post/clearPost')
        }

    }
</script>