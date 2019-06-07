<template>
    <div>
        <h1>this is login.vue</h1>
        用户名：<input type="text" v-model="username"/>{{ username }}
        密码： <input type="password" v-model="password"/>{{ password }}
        <button v-on:click="login">登录</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            username :"",
            password :""
        }
    },
    methods:{
        login(){
            //alert("this is login method");
            let data = {'username':this.username,'password':this.password};
            axios.post('/login',data).then((response)=>{
                console.log(response);
            }).catch((response)=>{
                console.log(response);
            })
        }
    }
}
</script>

<style scoped>

</style>
