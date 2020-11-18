<template>
  <div class="abus-height">
    <div class="cell-group">
      <!-- :finished-text="$t('noMore')" -->
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="100"
        :immediate-check="false"
      >
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
      </van-list>
      <div v-if="finished" class="v-finished-text">
        {{$t('noMore')}}
      </div>
    </div>
    
  </div>
</template>
<i18n>
	{
		"zh":{
			"noMore":"没有更多了"
		},
		"en":{
			"noMore":"No More..."
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VideoService from "../../../service/video";
@Component({
  name: "VideoLists",
  components: {},
})
export default class VideoList extends Vue {
  private arrLength: number = 13;
  private videoList: Array<any> = [];
  private pageNumber: any = 1;
  private pageSize: any = 10;
  private loading: boolean = false;
  private finished: boolean = false;

  private created() {
    this.postVideoList();
    // this.videoList = this.$store.state.video.videoList
  }
  public postVideoList() {
    VideoService.postVideoList({
      skip: (this.pageNumber - 1) * this.pageSize,
      take: this.pageSize,
    }).then((res: any) => {
      if (res.code == 200) {
        if (res.data.EOF) {
          this.finished = true;
        }
        this.videoList = this.videoList.concat(res.data.Videos);
        this.$store.commit("setVideoList", this.videoList);
      } else {
        this.$toast(res.massege);
      }
      this.loading = false;
    });
  }
  public onLoad() {
    this.pageNumber = this.pageNumber + 1;
    this.postVideoList();
  }
  public stepToVideoPlay(index: any) {
    this.$router.push({
      name: "videoPlay",
      params: {
        index: index,
        number: this.pageNumber,
      },
    });
  }
}
</script>

<style lang="scss" scoped>
.cell-group,
.van-list {
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
        border-radius: 0.1rem;
        z-index: 97;
      }
    }
  }
  
}
.v-finished-text{
  width: 100% !important;
  font-size: .24rem !important;
  text-align: center;
  line-height: 1rem;
}
</style>