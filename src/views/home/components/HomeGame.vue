<template>
  <div
    class="abus-scroller-box"
    :style="{ backgroundColor: isHaveData ? '#fff' : '#f2f4f7' }"
  >
    <scroller>
      <div slot="list" v-for="(item, index) of gameList" :key="index">
        <div
          class="s-box s-box-right"
          v-if="index + 1 == gameList.length"
          @click="goToGame(item)"
        >
          <img :src="item.CoverImgPath | addBaseUrl" :alt="item.title" />
        </div>
        <div class="s-box" v-else @click="goToGame(item)">
          <img :src="item.CoverImgPath | addBaseUrl" :alt="item.title" />
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import Vue from "vue";
import Scroller from "@nutui/nutui/dist/packages/scroller/scroller.js"; // 加载构建后的JS
import "@nutui/nutui/dist/packages/scroller/scroller.css";
import GameService from "../../../service/game";
Scroller.install(Vue);
export default {
  components: {
    Scroller,
  },
  data() {
    return {
      gameList: [],
      isHaveData: false,
    };
  },
  created() {
    this.getGameList();
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  },
  methods: {
    // 获取游戏列表
    getGameList() {
      GameService.getGameList().then((res) => {
        if (res.code == 200) {
          this.isHaveData = true;
          res.data.Games.forEach((item) => {
            item.img = item.CoverImgPath;
          });
          this.gameList = res.data.Games;
        }
      });
    },
    goToGame(item) {
      this.$router.push({
        name: "gameDetail",
        query: {
          gameUrl: item.GameUrl,
        }
      });
    },
  },
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
    opacity: 0.8;
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
