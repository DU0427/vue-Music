<template>
  <div class="about">
    <div class="nav">最新MV速递
    </div>
    <div v-if="mvShow">
    <ul 
    v-for="m in mvList" 
    :key="m.id"
    >
      <li @click="mvPlay(m.id)">
        <img :src="m.cover"/><br/>
        <div class="playIco"></div>
        MV名称：{{ m.name }}
        <div class="playBack"></div>
      </li>
    </ul>
  </div>
  <div v-if="!mvShow" class="videoBox">
    <video :src="mvUrl" autoplay controls></video>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name:'MyMusic',
  data(){
    return{
      mvList:[],
      mvUrl:'',
      mvShow:true
    }
  },
  components:{
  },
  methods:{
    mvPlay(id){
      axios({
        url: `/mv/url?id=${id}`, 
        method: 'post'
      })
        .then(res => {
          console.log('MV',res.data.data.url)
          this.mvUrl=res.data.data.url
          this.mvShow=false

        })
        .catch(err => {
          console.log(err+'搜索出错啦！！！')
        })
    }
  },
  mounted(){
    axios({
        url: `/mv/first?limit=50`, 
        method: 'post'
      })
        .then(res => {
          // console.log('mymusic',)
          this.mvList=res.data.data
        })
        .catch(err => {
          console.log(err+'搜索出错啦！！！')
        })
  }
};
</script>

<style scoped>
.about{
  position: relative;
  margin: 20px 50px;
  height: 100vh;
  width: 100vw;
  max-width: 1200px;
  max-height: 800px;
}
li{
  position: relative;
  height: 400px;
  width: 600px;
  margin:5px;
  float: left;
  cursor: pointer;
}

li:hover {
  box-shadow: rgba(16, 17, 22, 0.61) 0px 8px 24px,
    rgba(13, 13, 19, 0.377) 0px 16px 56px,
    rgba(10, 10, 15, 0.219) 0px 24px 80px;
  background-color: aliceblue;
}
img{
  height: 300px;
  width: 580px;
}
.videoBox{
  position: absolute;
  left: 50%;
  transform: translate(-50%,0);
  margin: 0 auto;
}
.nav {
  height: 35px;
  width: 100%;
  border-bottom: 3px solid rgb(20, 102, 12);
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 25px;
}

.playIco{
  display:none;
}

li:hover .playIco{
  display: block;
  background-image: url('../assets/play.png');
  background-repeat: no-repeat;
  height: 100px;
  width: 100px;
  position: absolute;
  left: 50%;
  top:50%;
  z-index: 2;
  transform: translate(-50%,-70%);
}
li:hover .playBack{
  display: block;
  background: black;
  width: 580px;
  height: 300px;
  position: absolute;
  top: 0;
  z-index: 1;
  opacity: 0.5;

}
</style>
