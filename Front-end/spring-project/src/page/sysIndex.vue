<template>
    <div>
        <h1>this is sysIndex</h1>
            <el-row>
                <el-col :span="6">
                    <side-bar @isWho="setWho"></side-bar>  
                </el-col>
            <el-col :span="18">
                <components-show :_who="who"></components-show>
            </el-col>
        </el-row>
        
        
    </div>   
</template>

<script>
import sideBar from '../components/sideBar.vue'
import componentsShow from '../components/componentsShow.vue'
export default {
    data(){
        return{
            componentsArr:{

            },
            who:''
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        window.console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        window.console.log(key, keyPath);
      },
      setWho(data){
          this.who = data;
      }

    },
    components:{
        sideBar,
        componentsShow
    }
}
</script>

<style>
    
</style>
