<template>
    <div class="container">
        <div class="signin_container">

            <h1>Sign in</h1>
            <form @submit.prevent="onSubmit">

                <div class="input_field">
                    <label>Email</label>
                    <input type="email" v-model.trim="formdata.email">
                </div>

                <div class="input_field">
                    <label>Password</label>
                    <input type="password" v-model.trim="formdata.password">
                </div>

                <button type="submit">
                    Sign in
                </button>
            </form>

        </div>
    </div>
</template>


<script>

    export default {
        data(){
            return{
                formdata:{
                    email:'',
                    password:''
                }
            }
        },
        methods:{
            onSubmit(){
                console.log(this.formdata)
            }
        }
    }
</script>

<style>
    .input_field.invalid input,
    .input_field.invalid select {
        border: 1px solid red;
    }

</style>