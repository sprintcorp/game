<template>
    <div class="dashboard_form">
        <h1>Add posts</h1>
        <form @submit.prevent="submitHandler">

            <div v-if="imageUploads">
                <img :src="imageUploads"/>
            </div>
            <div class="input_field">
                <input
                        type="file"
                        @change="processFile($event)"
                        ref="myFileInput"
                >
            </div>


            <div
                    class="input_field"
                    :class="{invalid: $v.formdata.title.$error}"
            >
                <label>Title</label>
                <input
                        type="text"
                        @blur="$v.formdata.title.$touch()"
                        v-model="formdata.title"
                >
                <p class="error_label" v-if="$v.formdata.title.$error">
                    This input is required
                </p>
            </div>

            <div
                    class="input_field"
                    :class="{invalid: $v.formdata.desc.$error}"
            >
                <label>Description</label>
                <input
                        type="text"
                        @blur="$v.formdata.desc.$touch()"
                        v-model="formdata.desc"
                >
                <p class="error_label" v-if="$v.formdata.desc.$error">
                    This input is required
                </p>
                <p class="error_label" v-if="!$v.formdata.desc.maxLength">
                    Must not be greater than {{$v.formdata.desc.$params.maxLength.max}} characters
                </p>
<!--                {{$v.formdata.desc}}-->
            </div>

            <div class="input_field">
                <wysiwyg
                        v-model="formdata.content"
                />
            </div>


            <div
                    class="input_field"
                    :class="{invalid: $v.formdata.rating.$error}"
            >
                <label>Rating</label>
                <select
                        @blur="$v.formdata.rating.$touch()"
                        v-model="formdata.rating"
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <p class="error_label" v-if="$v.formdata.rating.$error">
                    You need to select at least one
                </p>
            </div>

            <button type="submit" @click="submitHandler">Add post</button>
        </form>

        <div>
            <md-dialog :md-active.sync="dialog" >
                <p>Your post has no content, are you sure you want to post this</p>
                <md-dialog-actions>
                    <md-button class="md-primary" @click="closeDialog">Cancel</md-button>
                    <md-button class="md-primary" @click="confirmDialog">Confirm</md-button>
                </md-dialog-actions>
            </md-dialog>
        </div>
        {{getPostStatus}}
        <div v-if="getPostStatus" class="post_succesfull">
            Your post was posted
        </div>



    </div>
</template>

<script>
    import { required, maxLength } from 'vuelidate/lib/validators';
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                dialog: false,
                formdata: {
                    img: '',
                    title: '',
                    desc: '',
                    content: '',
                    rating: ''
                }
            }
        },
        validations: {
            formdata: {
                title: {
                    required,
                },
                desc: {
                    required,
                    maxLength: maxLength(100)
                },
                rating: {
                    required
                }
            }
        },
        computed:{
            // ...mapGetters(['imageUpload']),
          getPostStatus(){
            let status = this.$store.getters['admin/getPostStatus'];
            if(status){
                this.clearPost();
                this.$store.commit('admin/clearImageUpload')
            }
            return status;
          },
            imageUploads(){
                let imageUrl = this.$store.getters['admin/imageUpload'];
                this.formdata.img = imageUrl;
                return imageUrl;
            }
        },
        methods:{
            clearPost(){
                // this doesn't work now (after resetting the form values in the previous lines)
                //this.$v.$reset()

                // this works
                //setTimeout(() => { this.$v.$reset() }, 0)

                // this works even better - using Vue.nextTick method
                this.$nextTick(() => { this.$v.$reset() });
                this.formdata ={
                    title: '',
                    desc: '',
                    content: '',
                    rating: ''
                };
            },
            submitHandler(){
                if(!this.$v.$invalid){
                    if(this.formdata.content === ''){
                        this.dialog = true;
                    }else{
                        this.dialog = true;
                    }
                }else{
                    alert('something is wrong')
                }
            },
            addPost(){
                this.$store.dispatch('admin/addPost',this.formdata)
            },
            closeDialog(){
                this.dialog = false;
            },
            confirmDialog(){
                this.dialog = false;
                this.addPost()
            },
            processFile(event){
                let file = event.target.files[0];
                this.$store.dispatch('admin/imageUpload',file)
            }
        }
    }
</script>

<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";
    .input_field.invalid input,
    .input_field.invalid select {
        border: 1px solid red;
    }
</style>