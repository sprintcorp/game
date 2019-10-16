<template>
    <div>
        <md-table>
            <md-table-row>
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Title</md-table-head>
                <md-table-head>Description</md-table-head>
                <md-table-head>Rating</md-table-head>
                <md-table-head>Action</md-table-head>
            </md-table-row>

            <md-table-row v-for="(post,index) in posts" :key="index">
                <md-table-cell md-numeric></md-table-cell>
                <md-table-cell >{{post.title}}</md-table-cell>
                <md-table-cell>{{post.desc}}</md-table-cell>
                <md-table-cell>{{post.rating}}</md-table-cell>
<!--                <app-button @click="deleteHandler(post.id)" type="btn" :addClass="['delete_link']">Delete</app-button>-->
                <div class="post_delete" @click="deleteHandler(post.id)">Delete</div>
            </md-table-row>
        </md-table>

        <md-dialog-confirm
                :md-active.sync="confirmDelete"
                md-title="Are you sure you want to delete this"
                md-content=""
                md-confirm-text="Yes, Delete"
                md-cancel-text="No, Do not Delete"
                @md-cancel="onCancel"
                @md-confirm="onConfirm" />
    </div>

</template>

<script>
    export default {
        data(){
          return{
             confirmDelete:false,
              toDelete:''
          }
        },
        computed:{
          posts(){
              return this.$store.getters['admin/getAdminPost'];
          },
        },
        created() {
            this.$store.dispatch('admin/getAdminPosts');
        },
        methods:{
            deleteHandler(post){
                this.toDelete = post;
                this.confirmDelete = true
            },
            onCancel(){
                this.toDelete = '';
                this.confirmDelete = false
            },
            onConfirm(){
                this.$store.dispatch('admin/deletePost',this.toDelete);
                this.confirmDelete = false
            }
        }
    }
</script>