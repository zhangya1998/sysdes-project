<template>
    <el-menu
                    default-active="2"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <span>导航一</span>
                        </template>
                        <el-menu-item index="1-1">信息管理</el-menu-item>
                        <el-menu-item index="1-2">信息设置</el-menu-item>
                        <el-menu-item index="1-3">权限管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index='2'>
                        <template slot="title">
                            <span>导航二</span>
                        </template>
                        <el-menu-item index="2-1">监考管理</el-menu-item>
                        <el-menu-item index="2-2">监考信息浏览</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <span>导航三</span>
                        </template>
                        <el-menu-item index="3-1">任务管理</el-menu-item>
                        <el-menu-item index="3-2">人物信息浏览</el-menu-item>
                    </el-submenu>
                </el-menu>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>

