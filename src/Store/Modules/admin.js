/* eslint-disable */
import Vue from 'vue';
import response from "vue-resource/src/http/response";

const fbUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
const fbKey = 'AIzaSyDNwYbBStwEskeIHslCzgULr2dhBrH6_M8';

const admin = {
    namespaced: true,
    state: {
        token: null,
        refresh: null,
        type:null,
        authFailed : false,
    },
    getters: {

    },
    mutations: {

        auth(state,authData){
            state.token = authData.idToken,
             state.refresh = authData.refreshToken
        },
        authFailed(state,type){
            return (type === 'reset') ? state.authFailed = false:state.authFailed = true;
            // state.authFailed = true;
            // setTimeout(()=>{
            //     state.authFailed = false
            // },3000)
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
                    commit("auth",{
                        ...authData,
                    type:'signin'}
                    );
                    localStorage.setItem("token", authData.idToken);
                    localStorage.setItem("refresh", authData.refreshToken);
                })
                .catch( error => {
                    commit("authFailed")
                })
        },
    }
};
export default admin;