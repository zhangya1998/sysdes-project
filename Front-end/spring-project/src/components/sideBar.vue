<template>
    <el-menu
        default-active="2"
        background-color="#545c64"
        text-color="#fff">
            <!-- <el-submenu>
                <template slot="title">
                    <span>导航一</span>
                </template>
                <el-menu-item index="1-1" data-who="IM" @click="chooseComp($event)">信息管理</el-menu-item>
                <el-menu-item index="1-2" data-who="IS" @click="chooseComp($event)">信息设置</el-menu-item>
                <el-menu-item index="1-3" data-who="AM" @click="chooseComp($event)">权限管理</el-menu-item>
            </el-submenu> -->
            <el-menu-item index="1" data-who="IM" @click="chooseComp($event)">信息管理</el-menu-item>
            <el-submenu index='2' >
                <template slot="title">
                    <span>导航二</span>
                </template>
                <el-menu-item index="2-1" data-who="IpeM" @click="chooseComp($event)">监考管理</el-menu-item>
                <el-menu-item index="2-2" data-who="IpeIB" @click="chooseComp($event)">监考信息浏览</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <span>导航三</span>
                </template>
                <el-menu-item index="3-1" data-who="TM" @click="chooseComp($event)">任务管理</el-menu-item>
                <el-menu-item index="3-2" data-who="TIB" @click="chooseComp($event)">任务信息浏览</el-menu-item>
            </el-submenu>
    </el-menu>
</template>

<script>

export default {
    methods:{
        chooseComp:function(ev){
            window.console.log(ev.$el.dataset.who);
            this.$emit("isWho",ev.$el.dataset.who)
        }
    }
}
</script>

<style scoped>

</style>

