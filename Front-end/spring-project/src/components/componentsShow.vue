<template>
    <div id="view">
        <component :is="_who"></component>
    </div>
</template>

<script>
import GLOBAL from '../api/global_variable.js'

export default {
    data(){
        return {
            // who:'_wh'
        }
    },
    components:{
        IM:require(GLOBAL.compImportUrl+"informationManagement.vue").default,
        IS:require(GLOBAL.compImportUrl+"informationSettings.vue").default,
        AM:require(GLOBAL.compImportUrl+"authorityManagement.vue").default,
        IpeM:require(GLOBAL.compImportUrl+"inspectionManagement.vue").default,
        IpeIB:require(GLOBAL.compImportUrl+"inspectionInformationBrowing.vue").default,
        TM:require(GLOBAL.compImportUrl+"taskManagement.vue").default,
        TIB:require(GLOBAL.compImportUrl+"taskInformationBrowing.vue").default
    },
    props:['_who']
}
</script>

<style scoped>
#view{
        background: red;
        width:100%;
        height:500px;
    }
</style>
