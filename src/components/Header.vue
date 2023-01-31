<template>
  <div class="header">
    <div class="center">
      <h1>
        <router-link to="/" class="title">MUSIC</router-link>
      </h1>
    <nav>
      <router-link  
      class="route" 
      to="/">
      首页</router-link> 

      <router-link  
      class="route" 
      to="/MyMusic">
      我的音乐</router-link>

    </nav>
    <el-input
    class="search"
    placeholder="请输入内容"
    prefix-icon="el-icon-search"
    @keyup.enter.native="search"
    v-model="input">
  </el-input>

</div>
    
  </div>
</template>

<script>
import axios from '@/plugins/axios';
export default {
  name: 'Header',
  data() {
    return {
      input: '',
    };
  },
  methods:{
    search(){
      console.log('事件被触发')
      axios({
        url: `/cloudsearch?keywords=${this.input}`,  /**根据输入内容搜索歌曲 歌单 专辑 艺人等等 */
        method: 'post'
      })
        .then(res => {
          /* 得到了根据搜索的来的信息 将这些信息利用全局事件总线传递给home组件 */
          // console.log("我拿到的数据：", res.data.result.songs[0])
          this.$bus.$emit('search',res.data.result.songs,)
        })
        .catch(err => {
          console.log(err+'搜索出错啦！！！')
        })
    }
  }

}
</script>


<style scoped>
.header{
  height: 70px;
  width: 100%;
  background-color:#333333;
}
nav{
  position: absolute;
  top:50%;
  width: 300px;
  height: 30px;
  transform: translate(50%,-50%);
  
}
.route{
  font-size: 20px;
  color: aliceblue;
  margin-left: 20px;
}
.center{
  position: relative;
  width: 1100px;
  height: 70px;
  margin: 0 auto;
  padding-top:1px;
  padding-right: 1px;
}
h1{
  height: 50px;
  margin-top: 10px;
  overflow: hidden;
  display: inline-block;
}
h1 .title{
  color:whitesmoke;
}
.el-input--prefix{
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(0,-50%);
  width: 200px;
}

/*
 /deep/深度选择器 设置圆角样式
 */
.search /deep/ .el-input__inner{
  border-radius: 20px;
  width: 200px;
}

</style>
