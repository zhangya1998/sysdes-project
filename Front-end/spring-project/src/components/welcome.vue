<template>
    <div class="welcome">
        <div class="_title">欢迎来到这个管理系统</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    *{
  margin:0;
  padding:0;
}
#welcome {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width:100%;
  height:100%;
  background-image: url("./assets/img/bg_main.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
html{
  height: 100%;
}
body{
  height: 100%;
}
._title{
    width:100%;

    font-size:60px;
    color:white;
    letter-spacing:4px;
    font-family:'Times New Roman', Times, serif;
    text-align: center;

    
    /* top:-62px;
    
    
    transform: translateY(400%);
    transition: all 1s ease-in; */
}
</style>

