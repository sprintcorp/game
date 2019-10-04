import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home/index'

Vue.use(VueRouter);

const routes = [
    {path:'/', component:Home}
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