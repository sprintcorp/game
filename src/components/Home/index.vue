<template>
    <div>
       <app-featured></app-featured>
        <app-content></app-content>
    </div>
</template>

<script>
    import appFeatured from './featured';
    import appContent from './content';

    export default {
        components:{
            appFeatured,
            appContent
        }
    }
</script>