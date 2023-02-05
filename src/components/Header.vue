<template>
  <div class="header">
    <div class="center">
      <h1>
        <router-link to="/" class="title" exact>MUSIC</router-link>
      </h1>
      <nav>
        <router-link class="route" to="/" exact> 热门推荐歌手</router-link>

        <router-link class="route song" to="/Song" exact> 搜索内容</router-link>

        <router-link class="route" to="/MyMv" exact> 最新MV速递</router-link>

        <router-link class="route" to="/Chart" exact> 音乐分析图 </router-link>
      </nav>
      <div class="search">
        <input
          type="text"
          placeholder="请输入内容"
          @keyup.enter="search($event)"
          v-model="input"
        />
        <span class="bottom"></span>
        <span class="right"></span>
        <span class="top"></span>
        <span class="left"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "Header",
  data() {
    return {
      input: "",
      home: "",
      mv: "",
      chart: "",
    };
  },
  methods: {
    search(...[s]) {
      // console.log('事件被触发', this.input,typeof(s),( (s===undefined) &&(this.input === '')))
      if (typeof s == "object" && this.input === "") {
        alert("输入为空！！！请重新输入");
      } else {
        this.input=null
        // 控制路由跳转到/Song
        this.$router.push({ path: "/Song" });
        axios({
          url: `/cloudsearch?keywords=${
            this.input || s
          }&limit=88` /**根据输入内容搜索歌曲 歌单 专辑 艺人等等 */,
          method: "post",
        })
          .then((res) => {
            /* 得到了根据搜索的来的信息 将这些信息利用全局事件总线传递给Song组件 */
            // console.log("我拿到的数据：", res.data.result.songs[0])
            this.$bus.$emit("search", res.data.result.songs);
          })
          .catch((err) => {
            console.log(err + "搜索出错啦！！！");
          });
      }
    },
  },
  watch: {
    // // 通过监视路径的变化来变化导航栏的样式
    // $route(to){
    //   console.log(to.path+'header toto')
    //   if(to.path == '/' || to.path=='/Song'){
    //     this.home='Selected'
    //     this.mv=''
    //     this.chart=''
    //   }else{
    //     if(to.path == '/MyMv'){
    //       this.mv = 'Selected'
    //       this.home=''
    //       this.chart=''
    //     }else{
    //       if(to.path == '/Chart'){
    //         this.chart = 'Selected'
    //         this.home=''
    //         this.mv=''
    //       }
    //     }
    //   }
    // }
  },
  mounted() {
    this.$bus.$on("singer", this.search);
  },
  beforeDestroy() {
    this.$bus.$off("singer");
  },
};
</script>


<style scoped>
.header {
  height: 70px;
  width: 100%;
  background-color: #435f0ed1;
}
.center {
  position: relative;
  width: 75%;
  margin: 0 auto;
}

nav {
  float: left;
  height: 70px;
  font-size: 14px;
}

.route.song {
  display: none;
}
.route.song.router-link-active {
  display: inline-block;
}
.route:hover {
  background-color: #47660ed1;
}
.route.router-link-active {
  background-color: #47660ed1;
}
/* .Selected{  
  background-color:#47660ed1;
} */
h1 {
  float: left;
  height: 70px;
  line-height: 70px;
}

.route {
  font-size: 20px;
  color: aliceblue;
  margin-left: 20px;
  line-height: 70px;
  display: inline-block;
  padding: 0 5px;
}

h1 .title {
  color: whitesmoke;
}
.clearfix::after {
  content: "";
  clear: both;
}

div.search {
  position: relative;
  float: right;
  margin-top: 19px;
}

input {
  width: 10em;
  color: whitesmoke;
  font-size: inherit;
  font-family: inherit;
  padding: 0.35em 0.45em;
  border: 1px solid transparent;
  transition: background-color 0.3s ease-in-out;
  background-color: #063d1794;
}

input:focus {
  outline: none;
}

input::placeholder {
  color: hsla(0, 0%, 100%, 0.6);
}

span {
  position: absolute;
  background-color: #3cefff;
  transition: transform 0.5s ease;
}

.bottom,
.top {
  height: 1px;
  left: 0;
  right: 0;
  transform: scaleX(0);
}

.left,
.right {
  width: 1px;
  top: 0;
  bottom: 0;
  transform: scaleY(0);
}

.bottom {
  bottom: 0;
  transform-origin: bottom right;
}

input:focus ~ .bottom {
  transform-origin: bottom left;
  transform: scaleX(1);
}

.right {
  right: 0;
  transform-origin: top right;
}

input:focus ~ .right {
  transform-origin: bottom right;
  transform: scaleY(1);
}

.top {
  top: 0;
  transform-origin: top left;
}

input:focus ~ .top {
  transform-origin: top right;
  transform: scaleX(1);
}

.left {
  left: 0;
  transform-origin: bottom left;
}

input:focus ~ .left {
  transform-origin: top left;
  transform: scaleY(1);
}
</style>
