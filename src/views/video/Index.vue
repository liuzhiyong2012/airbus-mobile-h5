<template>
  <div class="home">
    <abus-title :title="$t('title')" backRouteName="home">
      <div slot style="width: 0.3rem"></div>
    </abus-title>
    <!-- backRouteName -->
    <van-tabs
      sticky
      line-width="20"
      line-height="4"
      color="rgb(0,32,91)"
      title-active-color="rgb(0,32,91)"
    >
      <van-tab v-for="(val,index) in navTar" :title="$t(val)" title-active-color="#3056EF" :key="index">
        <div v-if="val == 'All'" class="flight">
          <video-lists />
        </div>
        <div v-else-if="val == 'My collection'" class="flight">
          <video-list />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<i18n>
	{
		"zh":{
			"title":"视频",
      "Buy":"购买",
      "OutOfStock":"缺货",
      "QTY":"剩余量",
      "All":"所有",
      "My collection":"我的收藏"
		},
		"en":{
			"title":"Video",
      "Buy":"Buy",
      "OutOfStock":"Out of stock",
      "QTY":"QTY",
      "All":"All",
      "My collection":"My collection"
		}
	}
</i18n>
<script>
// @ is an alias to /src

import VideoLists from "@/views/video/components/VideoLists";
import VideoList from "@/views/video/components/VideoList";
import AbusTitle from "../../components/AbusTitle.vue";
export default {
  name: "Video",
  components: {
    VideoList,
    VideoLists,
    AbusTitle
  },
  data() {
    return {
      navTar: ["All","My collection"],
      imagesData: [
        {
          img: require("./images/video.jpg"),
          name: "name0",
          details: "details"
        },
        {
          img: require("./images/video.jpg"),
          name: "name",
          details: "details"
        },
        {
          img: require("./images/video.jpg"),
          name: "name",
          details: "details"
        }
      ]
    };
  },
  created() {
    this.$store.dispatch('deleteSongList');
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  }
};
</script>
 
<style scoped lang="scss">
.home {
  padding: 0 0 0.5rem 0;
  .video-top{
    margin: .3rem 0 0;
  }
  /deep/ .van-tab{
    line-height: 0.4rem;
  }
}
.van-tab--active {
  font-weight: 600;
}
</style>