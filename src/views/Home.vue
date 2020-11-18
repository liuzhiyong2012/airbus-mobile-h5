
<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar title="Airbus">
        <template #right>
          <van-icon name="scan" size="18" />
        </template>
        <template #left>
          <van-icon name="chat" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <van-tabs
      v-model="active"
      scrollspy
      sticky
      offset-top="46"
      line-width="20"
      line-height="4"
      color="rgb(0,32,91)"
      title-active-color="rgb(0,32,91)"
    >
      <van-tab v-for="(val,index) in navTar" :title="val" title-active-color="#3056EF" :key="index">
        <div v-if="val == 'Flight'" class="flight">
          <home-flight />
        </div>
        <div v-else-if="val == 'Dish'">
          <home-dish />
        </div>
        <div v-else-if="val == 'Shopping'">
          <home-shopping />
        </div>
        <div v-else-if="val == 'Music'">
          <home-music />
        </div>
        <div v-else-if="val == 'Game'">
          <home-game :imgData="imagesData" />
        </div>
        <div v-else-if="val == 'Video'">
          <home-video />
        </div>
        <div v-else-if="val == 'News'">
          <home-news />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeFlight from "@/views/home/HomeFlight";
import HomeDish from "@/views/home/HomeDish";
import HomeShopping from "@/views/home/HomeShopping";
import HomeMusic from "@/views/home/HomeMusic";
import HomeGame from "@/views/home/HomeGame";
import HomeVideo from "@/views/home/HomeVideo";
import HomeNews from "@/views/home/HomeNews";
// import { getApprovalDetail } from "@/service/center";

export default {
  name: "Home",
  components: {
    HomeFlight,
    HomeDish,
    HomeShopping,
    HomeMusic,
    HomeGame,
    HomeVideo,
    HomeNews
  },
  data() {
    return {
      navTar: ["Flight", "Dish", "Shopping", "Music", "Game", "Video", "News"],
      imagesData: [
        {
          img: require("./home/images/game.jpg"),
          name: "name0",
          details: "details"
        },
        {
          img: require("./home/images/game.jpg"),
          name: "name",
          details: "details"
        },
        {
          img: require("./home/images/game.jpg"),
          name: "name",
          details: "details"
        }
      ]
    };
  },
  created() {
    //  getApprovalDetail({}).then((res) => {
    //     let  data = res.data;
    //   }).finally(() => {
    //   })
  }
};
</script>

<style scoped lang="scss">
.home {
  padding: 0 0 0.5rem 0;
}
</style>