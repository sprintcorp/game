/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import admin from './Modules/admin';
import post from './Modules/posts';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        admin,
        post
    }
})