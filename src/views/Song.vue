<template>
    <div class="song">
        <div class="nav">搜索内容</div>
        <ul v-for="m in musicList" :key="m.id">
            <li>
                <img class="songlist" @click="getLink(m.id, m.al.picUrl, m.name, m.ar[0].name)"
                    :src="m.al.picUrl" /><br />
                <span>歌曲名：{{ m.name }}</span><br />
                <span>歌手：{{ m.ar[0].name }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Song',
    data() {
        return {
            musicList: [],
        }
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
                    this.$message({
                        message:'音乐马上就来',
                        type:'success'
                    })
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
                    this.$message.error('歌词搜索出了点小错误啦   请再尝试点击一下~~~~')    
                });
        }
    },
    mounted() {
        /* 拿到搜索来的数据 然后将这个数据动态的渲染到页面中 */
        this.$bus.$on("search", (songs) => {
            this.musicList = songs;
        });
    },
    beforeDestroy() {
        // 解绑自定义事件
        this.$bus.$off('search')
    },


}
</script>

<style scoped>
.song {
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