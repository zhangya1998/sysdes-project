<template>
    <div id="wrapper">
        <h1>this is login.vue</h1>
        用户名：<input type="text" v-model="user.number"/>
        密码： <input type="password" v-model="user.password"/>
        <button v-on:click="login">登录</button>
        
    </div>
</template>

<script>
import axios from 'axios';
import { Message } from "element-ui";
export default {
    data(){
        return {
            user:{
                number:"",
                password:""
            }
            
        }
    },
    methods:{
            login() {
                window.console.log(this.user.number == "" || this.user.password == "");
                if (this.user.number == "" || this.user.password == "") {
                    Message.warning("用户名和密码不能为空");
                    return;
                }
                axios.post("/login", this.user).then(response => {
                    window.console.log(this.user.id);
                    let token = response.headers["token"];
                    let role = response.headers["role"];
                    let id = response.headers["id"];
                    if (token != null) {
                        sessionStorage.setItem("token", token);
                        sessionStorage.setItem("role", role);
                        sessionStorage.setItem("id", id);
                        this.$router.push('/sysIndex');
                    }
                })
                .catch((response)=>{
                    Message.warning("用户名或密码错误");
                    window.console.log(response);
                });
            }
    }
}
</script>

<style scoped>
    #wrapper{
        background-color: #fff;
    }
</style>
