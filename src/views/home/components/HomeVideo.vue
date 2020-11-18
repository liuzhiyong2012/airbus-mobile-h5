<template>
  <div class="abus-scroller-box" :style="{'backgroundColor': isHaveData?'#fff':'#f2f4f7'}">
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
import Vue from "vue";
import Scroller from "@nutui/nutui/dist/packages/scroller/scroller.js"; // 加载构建后的JS
import "@nutui/nutui/dist/packages/scroller/scroller.css";
import VideoService from "../../../service/video";
Scroller.install(Vue);
export default {
  components: {
    Scroller
  },
  data() {
    return {
      videoList: "",
      isHaveData: false,
      dishData: [
        {
          img: require("../images/video.jpg"),
          name: "Pock rice"
        }
      ]
    };
  },
  created() {
    this.postVideoList();
  },
  methods: {
    postVideoList() {
      // 固定列表
      // VideoService.postVideoList().then(res => {
        // 随机列表
      VideoService.getVideoRecommended().then(res => {
        // CommentCount: 1
        // CoverImgId: "75840a83-3425-e911-bd22-c4209d3e3b89"
        // CoverImgPath: "http://disk.service.osp.connectivity.aero/429c349d-b44b-415a-ab2b-bbccb499195e"
        // CreatedAt: 1548924370
        // Creator: {UserName: "admin", NickName: "IFE系统管理员", PhoneNumber: null, Email: "1356591901@qq.com", Id: "b3f4bbbf-0ff5-4a75-ad8d-88da74053341", …}
        // Description: null
        // Height: 1280
        // Id: "46a71fa7-3425-e911-bd22-c4209d3e3b89"
        // IsAdvertisement: false
        // LikeCount: 1
        // Size: 15098211
        // Width: 720
        // title: "网红奶茶火锅吃过吗？帮你们省钱了，踩雷啦！！还不如喝奶茶吃正常火锅"
        if (res.code == 200) {
          this.isHaveData = true
          this.videoList = res.data.Videos;
          this.$store.commit("setVideoList",this.videoList)
          // this.videoList.forEach((item, index) => {
          //   item.BannerImgPath =
          //     "http://172.16.125.11:8010/78a3dfb2-7b10-42b4-8a3b-e6d626e34c99";
          // });
        }
      });
    },
    stepToVideoPlay(index){
    this.$router.push({
      name: 'videoPlay',
      params:{
        index: index
      }
    })
  }
  }
};
</script>

<style lang="scss" scoped>
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
    border-radius: 0.1rem;
    z-index: 96;
  }
}
.s-box-right {
  margin-right: 0.82rem;
}
</style>