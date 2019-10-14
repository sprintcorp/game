import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './Store/store';
import Home from './components/Home/index'
import Signin from './components/Signin/index.vue';
import Dashboard from './components/Dashboard/index'
import MainDashboard from './components/Dashboard/main.vue';
import AddPosts from './components/Dashboard/addPosts.vue';
import PostsList from './components/Dashboard/listPosts.vue';

Vue.use(VueRouter);

const authGaurd = {
    beforeEnter: (to, from, next) => {

        const redirect = () => {
            if( store.state.admin.token ){
                if(to.path === '/Signin'){
                    next('/Dashboard')
                } else {
                    next()
                }
            } else {
                if(to.path === '/Signin' ){
                    next()
                } else {
                    next('/')
                }
            }
        };

        if( store.state.admin.refreshLoading ){
            store.watch((state, getters)=> getters['admin/refreshLoading'],()=>{
                redirect();
            })
        } else {
            redirect();
        }

    }
};
const routes = [
    {path:'/', component:Home},
    {path:'/Signin', component:Signin ,name:'Signin', ...authGaurd},
    {path:'/Dashboard', component: Dashboard,name:'Dashboard',children:[
            { path:'/',component: MainDashboard },
            { path:'add_posts',component: AddPosts },
            { path:'posts_list',component: PostsList },
        ],...authGaurd}
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