<template>
  <div class="allFooter" >
    <aplayer
    v-if="onPlay"
    class="audio" 
    :music="audio[0]"  
    :showlrc="true"
    ></aplayer>
</div>
</template>

<script>
import aplayer from "vue-aplayer"; 

export default {
    name:'Footer',
    components:{
      aplayer
    },
    data() {
        return {
          onPlay:false,
          audio:  [
            {
                title:'',
                artist: '',
                url: '',
                pic: '',
                lrc: '',
            },
          ]
        };
    },
    methods:{

    },
    mounted(){
      /* 接收这首歌的相关信息 对象
      将这个对象插入到audio这个初始数组中
       并且在这里将play组件渲染出来 */
      this.$bus.$on('musicUrl',(play)=>{
        this.audio.unshift(play)
        this.onPlay=true
      })
    }

}
</script>

<style  scoped>
.allFooter{
  height: 50px;
  width: 100vw;
}
.play{
  font-size: 40px;
  width: 200px;
  margin: 0 auto;
}
i{
  cursor: pointer;
  margin: 0 2px;
}

</style>>
