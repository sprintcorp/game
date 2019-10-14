<template>
  <div>
    <app-header></app-header>
      <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import appHeader from './components/Head-Footer/Header';
  import appFooter from './components/Head-Footer/Footer';
export default {
components:{
  appHeader,
  appFooter

},
  created(){
    this.$store.dispatch("admin/refreshToken");
  }
}
</script>

<style>
@import './assets/style.css';
</style>
