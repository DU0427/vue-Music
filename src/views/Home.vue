<template>
  <div>

    <div class="song" v-if="!wait">
      <div class="nav">搜索内容</div>
      <ul v-for="m in musicList" :key="m.id">
        <li>
          <img class="songlist" @click="getLink(m.id, m.al.picUrl, m.name, m.ar[0].name)" :src="m.al.picUrl" /><br />
          <span>歌曲名：{{ m.name }}</span><br />
          <span>歌手：{{ m.ar[0].name }}</span>
        </li>
      </ul>
    </div>
    <div v-if="wait" class="singer">
      <div class="nav">热门推荐歌手</div>
      <ul v-for="s, index in singer" :key="index">
        <li>
          <img class="songlist" :src="s.picUrl" @click="singerName(s.name)" /><br />
          <span>歌手：{{ s.name }}</span><br />
          <span v-if="s.alias[0]">别名：{{ s.alias[0] }}</span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import axios from "@/plugins/axios";


export default {
  name: "Home",
  data() {
    return {
      wait: true,
      singer: {},
      musicList: [],
    };
  },
  components: {

  },
  methods: {
    /* 根据点击页面不同的盒子 
    获取到该盒子对应的id 
    利用这个id去发送网络请求 
    搜索歌曲的url */
    getLink(id, picUrl, title, name) {
      axios({
        /* &level=lossless是音质配置选项 */
        url: `/song/url?id=${id}&level=lossless`,
        method: "post",
      })
        .then((res) => {
          /* 拿到点击歌曲的url 
          歌手歌曲名，单曲主页图片链接 信息 
          将这些信息汇总成一个对象
          */
          // console.log("我拿到的歌曲数据：id", res.data.data);
          this.play = {
            title: title,
            artist: name,
            url: res.data.data[0].url,
            pic: picUrl,
          };
        })
        .catch((err) => {
          console.log(err + "搜索歌曲出错啦！");
        });
      /* 
        发送请求获取点击歌曲的歌词 
        这里实现不太完美 后续想办法优化一下
        */
      axios({
        url: `/lyric?id=${id}`,
        method: "post",
      })
        .then((res) => {
          /* 将获取的歌词数据和上面获取的该歌曲的其他信息整理成一个对象汇总起来 
          用全局事件总线将这个对象传递给footer组件 */
          this.$set(this.play, "lrc", res.data.lrc.lyric);
          // console.log('lrc',this.play)
          this.$bus.$emit("musicUrl", this.play);
        })
        .catch((err) => {
          console.log(err + "搜索歌词出错啦！");
        });
    },
    singerName(name) {
      console.log(name)
      this.$bus.$emit('singer', name)
    }
  },
  mounted() {
    /* 拿到搜索来的数据 然后将这个数据动态的渲染到页面中 */
    this.$bus.$on("search", (songs) => {
      this.musicList = songs;
      this.wait = false
    });
    // 获取热门歌手数据
    axios({
      url: `/top/artists?offset=0&limit=55`,
      method: 'post'
    })
      .then(res => {
        // console.log('热门歌手',res.data.artists[0].alias[0])
        this.singer = res.data.artists

      })
      .catch(err => {
        console.log(err + '搜索出错啦！！！')
      })
  },
  beforeDestroy() {
    console.log('清除自定义事件')
    this.$bus.$off('search')
  },
};
</script>


<style scoped>
.song,
.singer {
  margin: 20px 100px;
}

/* 热门推荐板块导航栏 */
.nav {
  height: 35px;
  width: 100%;
  border-bottom: 3px solid red;
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 25px;
}

/* 首页热门推荐相关列表样式 */
li {
  position: relative;
  float: left;
  height: 250px;
  width: 200px;
  margin: 5px;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  text-align: center;
  border: 2px solid aliceblue;

}

li:hover {
  box-shadow: rgba(16, 16, 22, 0.1) 0px 8px 24px,
    rgba(13, 13, 19, 0.1) 0px 16px 56px,
    rgba(10, 10, 15, 0.1) 0px 24px 80px;
  background-color: aliceblue;
}

.songlist {
  height: 175px;
  width: 175px;
}

.wait {
  text-align: center;
}

.wait img {
  width: 50%;
}
</style>
