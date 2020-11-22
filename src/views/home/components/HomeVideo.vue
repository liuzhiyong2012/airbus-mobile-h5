<template>
  <div class="abus-scroller-box home-video-ctn" :style="{'backgroundColor': isHaveData?'#fff':'#f2f4f7'}">
    <scroller>
      <div slot="list" v-for="(item, index) of videoList" :key="index">
        <div class="s-box s-box-right" v-if="index+1 == videoList.length" @click="stepToVideoPlay(index)">
          <img :src="item.CoverImgPath|addBaseUrl" :alt="item.title" />
          <svg class="icon icon-p" aria-hidden="true">
            <use xlink:href="#icon-play-disable" />
          </svg>
        </div>
        <div class="s-box" v-else @click="stepToVideoPlay(index)">
          <img :src="item.CoverImgPath|addBaseUrl" :alt="item.title" />
          <svg class="icon icon-p" aria-hidden="true">
            <use xlink:href="#icon-play-disable" />
          </svg>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import Vue from 'vue';
import Scroller from '@nutui/nutui/dist/packages/scroller/scroller.js'; // 加载构建后的JS
import '@nutui/nutui/dist/packages/scroller/scroller.css';
import VideoService from '../../../service/video';
Scroller.install(Vue);
export default {
  components: {
    Scroller 
  },
  data() {
    return {  
      videoList: '',
      isHaveData: false,
      dishData: [
        {
          img: require('../images/video.jpg'),
          name: 'Pock rice'
        }
      ]
    };
  },
  created() {
    this.postVideoList();
  },
  methods: {
    postVideoList() {
     
      VideoService.getVideoRecommended().then(res => {
      
        if (res.code == 200) {
          this.isHaveData = true;
          this.videoList = res.data.Videos;
          this.$store.commit('setVideoList',this.videoList);
   
        }
      });
    },
    stepToVideoPlay(index){
    this.$router.push({
      name: 'videoPlay',
      params:{
        index: index
      }
    });
  }
  }
};
</script>

<style lang="scss" scoped>
	
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
	
		.home-video-ctn{
			.s-box {
			  display: flex;
			  position: relative;
			  float: left;
			  // height: 1.6rem;
			  margin: 0 0 0 0.28rem;
			  border-radius: 0.1rem;
			  width: 2.1rem;
			  height: 3.72rem;
			  background-color: #000;
			  align-items: center;
			  overflow: hidden;
			  // box-shadow: 0 0 0.08rem #efefef;
			  .icon-p {
			    position: absolute;
			    right: 0.3rem;
			    bottom: 0.3rem;
			    z-index: 98;
			    opacity: .8;
			  }
			  img {
			    width: 100%;
			    // border-radius: 0.1rem;
			    z-index: 96;
			  }
			}
			.s-box-right {
			  margin-right: 0.82rem;
			}
		}
	}
	
	@media  (orientation:landscape) {
		.home-video-ctn{
			margin: 0 rpx(20);
			padding: rpx(20);
			.s-box {
			  display: flex;
			  position: relative;
			  float: left;
			  margin-right: rpx(20);
			  border-radius: rpx(4);
			  width: rpx(160);
			  height:  rpx(200);
			  background-color: #000;
			  align-items: center;
			  overflow: hidden;
			  
			  .icon-p {
			    position: absolute;
			    right: rpx(20);
			    bottom: rpx(20);
			    z-index: 98;
			    opacity: .8;
				width: rpx(24);
				height: rpx(24);
			  }
			  img {
			    width: 100%;
			    z-index: 96;
			  }
			  >.icon{
				  width: rpx(24);
				  height: rpx(24);
			  }
			}
			.s-box-right {
			  margin-right: 0.82rem;
			}
		}
	}
	

</style>