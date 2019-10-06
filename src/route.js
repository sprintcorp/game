import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home/index'
import Signin from './components/Signin/index.vue';

Vue.use(VueRouter);

const routes = [
    {path:'/', component:Home},
    {path:'/Signin', component:Signin ,name:'Signin'}
];

export default new VueRouter({
    mode:'history',
    routes,
    scrollBehavior(fron,to,savedPosition){
        return{
            x:0,
            y:0
        }
    }
});