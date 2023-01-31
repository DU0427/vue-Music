<template>
  <div id="app">
    <!--头部组件 -->
    <Header class="header"/>
    <!-- 主题组件依靠路由跳转实现 -->
    <div class="main">
    <router-view/>
  </div>
  <!-- 底部组件 -->
  <Footer class="footer"/>
  </div>
</template>
<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default{
  components:{
    Header,
    Footer
  }
}
</script>


<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
a{
  text-decoration: none;
}
.footer{
  position: fixed;
  bottom: 50px;
}
.main{ 
  height: 100vh;
}
.header{
  height: 70px;
}
</style>
