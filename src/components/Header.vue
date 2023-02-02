<template>
  <div class="header">
    <div class="center">
      <h1>
        <router-link to="/" class="title">MUSIC</router-link>
      </h1>
      <nav>
        <router-link class="route" to="/">
          首页</router-link>

        <router-link class="route" to="/MyMusic">
          我的音乐</router-link>

      </nav>
      <div class="search">
        <input type="text"  placeholder="请输入内容"  @keyup.enter="search($event)"
        v-model="input" />
        <span class="bottom"></span>
        <span class="right"></span>
        <span class="top"></span>
        <span class="left"></span>
      </div>
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
  methods: {
    search(...[s]) {
      // console.log('事件被触发', this.input,typeof(s),( (s===undefined) &&(this.input === '')))
      if ((typeof (s) == 'object') && (this.input === '')) {
        alert('输入为空！！！请重新输入')
      } else {
        axios({
          url: `/cloudsearch?keywords=${this.input || s}&limit=88`,  /**根据输入内容搜索歌曲 歌单 专辑 艺人等等 */
          method: 'post'
        })
          .then(res => {
            /* 得到了根据搜索的来的信息 将这些信息利用全局事件总线传递给home组件 */
            // console.log("我拿到的数据：", res.data.result.songs[0])
            this.$bus.$emit('search', res.data.result.songs,)
          })
          .catch(err => {
            console.log(err + '搜索出错啦！！！')
          })
      }
    }
  },
  mounted() {
    this.$bus.$on('singer', this.search)
  },
  beforeDestroy() {
    this.$bus.$off('singer')
  }

}
</script>


<style scoped>
.header {
  height: 70px;
  width: 100%;
  background-color: #333333;
  text-align: center;
  justify-content:center
}

nav {
  position: absolute;
  top: 50%;
  width: 200px;
  height: 30px;
  transform: translate(50%, -50%);
  text-align: center;
  justify-content: center;

}

.route {
  font-size: 20px;
  color: aliceblue;
  margin-left: 20px;
}

.center {
  display: flex;
  position: relative;
  width: 50%;
  height: 70px;
  margin: 0 auto;
  padding-top: 1px;
  padding-right: 1px;
  background-color: #333333;
}

h1 {
  height: 50px;
  margin-top: 10px;
  overflow: hidden;
  display: inline-block;
}

h1 .title {
  color: whitesmoke;
}


div.search {
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%,-50%);
}

input {
  width: 10em;
  color:whitesmoke;
  font-size: inherit;
  font-family: inherit;
  padding: 0.35em 0.45em;
  border: 1px solid transparent;
  transition: background-color 0.3s ease-in-out;
  width: 200px;
  background-color: #585050;
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
