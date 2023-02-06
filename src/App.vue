<template>
  <div id="app">
    <!--头部组件 -->
    <Header class="header" />
    <!-- 主题组件依靠路由跳转实现 -->
    <div class="main">
      <router-view />
    </div>
    <!-- 底部组件 -->
    <Footer class="footer" />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from '@/components/Footer.vue';
export default {
  components: {
    Header,
    Footer
  },
  mounted(){
    this.$message({
      message:'欢迎您来到我的作品，如遇卡顿问题请耐心等待或者刷新重试，后续我将会不断更新改进',
      type:'success',
      duration:8000,
      showClose:true
    })
  }
}
</script>


<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  text-decoration: none;
}

.footer {
  position: fixed;
  bottom: 50px;
}

.main {
  height: 100vh;
  width: 100vw;
}

.header {
  height: 70px;
}
</style>
