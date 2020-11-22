<template>
  <div class="abus-height" v-if="!isNoVideo">
    <div class="cell-group">
      <div class="cell-item" v-for="(item, index) in videoList" :key="index">
        <div class="video-box" @click="stepToVideoPlay(index)">
          <img :src="item.CoverImgPath|addBaseUrl" :alt="item.title" />
          <svg class="icon icon-p" aria-hidden="true">
            <use xlink:href="#icon-play-disable" />
          </svg>
        </div>
      </div>
      <div class="cell-item" v-if="videoList.length % 3 == 1"></div>
      <div class="cell-item" v-if="videoList.length % 3 == 1"></div>
      <div class="cell-item" v-if="videoList.length % 3 == 2"></div>
    </div>
  </div>
  <div v-else class="no-video">{{$t('noVideo')}}</div>
</template>
<i18n>
	{
		"zh":{
			"noVideo":"暂无收藏视频"
		},
		"en":{
			"noVideo":"No favorite video"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VideoService from "../../../service/video";
@Component({
  name: "VideoList",
  components: {},
})
export default class VideoList extends Vue {
  private videoList: Array<any> = [];
  private isNoVideo: boolean = false;
  private created() {
    this.postVideoMyLike();
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  }
  public postVideoMyLike() {
    VideoService.postVideoMyLike().then((res: any) => {
      if (res.code == 200) {
        this.videoList = res.data.video;
        this.$store.commit("setMyLikeList", this.videoList);
        if (res.data.video.length == 0) {
          this.isNoVideo = true;
        }
      }
    });
  }
  public stepToVideoPlay(index: any) {
    this.$router.push({
      name: "likePlay",
      params: {
        index: index,
      },
    });
  }
}
</script>

<style lang="scss" scoped>
    @import '../../../assets/style/index.scss';

    @media  (orientation:portrait) {
        .cell-group {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            .cell-item {
                width: 30%;
                .video-box {
                    position: relative;
                    display: flex;
                    margin: 0.3rem 0 0;
                    border-radius: 0.1rem;
                    width: 100%;
                    height: 4rem;
                    background-color: #000;
                    align-items: center;
                    overflow: hidden;
                    .icon-p {
                        position: absolute;
                        right: 0.2rem;
                        bottom: 0.2rem;
                        z-index: 98;
                        opacity: 0.8;
                    }
                    img {
                        width: 100%;
                        // border-radius: 0.1rem;
                        z-index: 97;
                    }
                }
            }
        }
        .no-video {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 3rem;
        }
    }

    @media  (orientation:landscape) {
        .cell-group,
        .van-list {
            display: flex;
            flex-wrap: wrap;
            //justify-content: space-evenly;
            .cell-item {
                padding: 0 0rem 0 0.32rem;
                width: 2rem;
                .video-box {
                    position: relative;
                    display: flex;
                    margin: 0.3rem 0 0;
                    border-radius: 0.1rem;
                    width: 100%;
                    height: 3rem;
                    background-color: #000;
                    align-items: center;
                    overflow: hidden;
                    .icon-p {
                        position: absolute;
                        right: 0.2rem;
                        bottom: 0.2rem;
                        z-index: 98;
                        opacity: 0.8;
                    }
                    img {
                        width: 100%;
                        border-radius: 0.1rem;
                        z-index: 97;
                    }
                }
            }

        }
        .no-video {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 3rem;
            font-size: .16rem !important;
        }
    }
</style>