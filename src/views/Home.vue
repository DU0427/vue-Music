<template>
  <div>
    <!-- 首页组件 -->
    <div  class="singer">
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
      singer: {},
    };
  },
  components: {
  },
  methods: {
    singerName(name) {
      // 点击歌手页面跳转到歌手所有歌曲页面 
      this.$router.push({path:'/Song'})
      this.$bus.$emit('singer', name)
    }
  },
  mounted() {
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
};
</script>


<style scoped>
.singer {
  margin: 20px 100px;
}

/* 热门推荐板块导航栏 */
.nav {
  height: 35px;
  width: 100%;
  border-bottom: 3px solid rgb(20, 102, 12);
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
  box-shadow: rgba(16, 17, 22, 0.61) 0px 8px 24px,
    rgba(13, 13, 19, 0.377) 0px 16px 56px,
    rgba(10, 10, 15, 0.219) 0px 24px 80px;
  background-color: aliceblue;
}

.songlist {
  height: 175px;
  width: 175px;
}


</style>
