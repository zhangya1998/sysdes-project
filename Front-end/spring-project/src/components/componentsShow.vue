<template>
    <div id="view">
        <component :is="_who"></component>
    </div>
</template>

<script>


export default {
    data(){
        return {
            
        }
    },
    components:{
        IM:require("./inComponentsShow/"+"informationManagement.vue").default,
        IS:require("./inComponentsShow/"+"informationSettings.vue").default,
        AM:require("./inComponentsShow/"+"authorityManagement.vue").default,
        IpeM:require("./inComponentsShow/"+"inspectionManagement.vue").default,
        IpeIB:require("./inComponentsShow/"+"inspectionInformationBrowing.vue").default,
        TM:require("./inComponentsShow/"+"taskManagement.vue").default,
        TIB:require("./inComponentsShow/"+"taskInformationBrowing.vue").default
    },
    props:['_who']
}
</script>

<style scoped>
#view{
        width:100%;
        height:100%;
        border:1px solid black;
    }
</style>
