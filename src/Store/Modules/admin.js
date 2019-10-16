/* eslint-disable */
import Vue from 'vue';
import response from "vue-resource/src/http/response";
import router from '../../route';

const fbUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
const fbKey = 'AIzaSyDNwYbBStwEskeIHslCzgULr2dhBrH6_M8';

const admin = {
    namespaced: true,
    state: {
        token: null,
        refresh: null,
        login: null,
        authFailed: false,
        refreshLoading:true,
        addPost:false,
        imageUpload:null,
        adminPost: null
    },
    getters: {
        isAuth(state) {
            return (state.token) ? true : false;
        },
        refreshLoading(state){
            return state.refreshLoading;
        },
        getPostStatus(state){
            return state.addPost;
        },
        imageUpload(state){
            return state.imageUpload;
        },
        getAdminPost(state){
            return state.adminPost;
        }
    },
    mutations: {
        authUser(state, authData) {
            state.token = authData.idToken;
            state.refresh = authData.refreshToken;
            if (authData.type === 'signin') {
                router.push('/dashboard')
            }
        },
        authFailed(state, type) {
            return (type === 'reset') ? state.authFailed = false : state.authFailed = true;
        },
        logoutUser(state) {
            state.token = null;
            state.refresh = null;
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
            router.push('/');
        },
        refreshLoading(state){
            state.refreshLoading = false;
        },
        setPostStatus(state){
            state.addPost = true;
        },
        postTimeOut(state){
            state.addPost = false;
        },
        imageUpload(state,imageData){
            state.imageUpload = imageData.secure_url;
        },
        clearImageUpload(state){
            state.imageUpload = null
        },
        getAdminPosts(state,posts){
            state.adminPost = posts
        }
    },
    actions: {
        signIn({commit}, payload) {
            Vue.http.post(`${fbUrl}:signInWithPassword?key=${fbKey}`, {
                ...payload,
                returnSecureToken: true
            })
                .then(response => response.json())
                .then(authData => {
                    commit("authUser", {
                            ...authData,
                            type: 'signin'
                        }
                    );
                    localStorage.setItem("token", authData.idToken);
                    localStorage.setItem("refresh", authData.refreshToken);
                })
                .catch(error => {
                    commit("authFailed")
                })
        },
        refreshToken({commit}) {
            const refreshToken = localStorage.getItem("refresh");

            if (refreshToken) {
                Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${fbKey}`, {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
                    .then(response => response.json())
                    .then(authData => {
                        commit("authUser", {
                            idToken: authData.id_token,
                            refreshToken: authData.refresh_token,
                            type: 'refresh'
                        });
                        commit("refreshLoading");
                        localStorage.setItem("token", authData.id_token);
                        localStorage.setItem("refresh", authData.refresh_token);
                    })
            }else{
                commit("refreshLoading");
            }
        },
        addPost({commit,state},payload){
            Vue.http.post(`posts.json?auth=${state.token}`,payload)
                .then(response => response.json())
                .then(response=>{
                    commit("setPostStatus");
                    setTimeout(() =>{
                        commit("postTimeOut");
                    },3000)
                })
        },
        imageUpload({commit},file){
            const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/sprintcorp/image/upload";
            const CLOUDINARY_PRESET = "esryvz6f";

            let formData = new FormData();
            formData.append('file',file);
            formData.append('upload_preset',CLOUDINARY_PRESET);

            Vue.http.post(CLOUDINARY_URL,formData,{
                headers:{
                    'Content-type':'application/x-www-form-urlencoded'
                }
            })
                .then( response => response.json())
                .then( response => {
                    commit("imageUpload",response);
                    //  console.log(response)
                })
        },
        getAdminPosts({commit}){
            Vue.http.get('posts.json')
                .then( response => response.json())
                .then( response => {
                    const posts = [];
                    for(let key in response){
                        posts.push({
                            ...response[key],
                            id: key
                        })
                    }
                    commit("getAdminPosts",posts.reverse())
                })
        },
        deletePost({commit,state},payload){
            Vue.http.delete(`posts/${payload}.json?auth=${state.token}`)
                .then(response => response.json())
                .then(response=>{
                   let newPosts = [];
                   state.adminPost.forEach(post=>{
                       if(post.id != payload){
                           newPosts.push(post)
                       }
                   });
                    commit('getAdminPosts',newPosts)
                })
        }
    }
};
export default admin;