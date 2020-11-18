<template>
  <div class="news">
    <van-sticky>
      <van-nav-bar title="Game">
        <template #left>
          <van-icon name="arrow-left" size="18" @click="goBack" />
        </template>
      </van-nav-bar>
    </van-sticky>
  
    <div class="scroller-box">
      <div
        class="scroller-item"
        v-for="(item, index) of gameBannerData"
        :key="index"
      >
        <img :src="item.img" alt="" />
        <p class="scoller-name">{{ item.name }}</p>
      </div>
    </div>

    <hot-game-list />

    <h2 class="abus-block-title">
      <van-cell title="Popular series" class="block-title-background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>

    <div class="game-box">
      <div class="game-item" v-for="(item, index) in gameList" :key="index">
        <div class="game">
          <div class="game-img">
            <div class="game-img-up">
              <img  :src="item.imgUp" alt="" width="100%" />
            </div>
            <div class="game-img-down">
              <div class="img">
                <img  :src="item.imgLeft" alt="" width="100%"/>
              </div>
              <div class="img">
                <img  :src="item.imgRight" alt=""  width="100%"/>
              </div>
              
            </div>
          </div>
          <div class="game-name game-word">{{ item.name }}</div>
          <div class="game-tips game-word">{{ item.details }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotGameList from "./components/HotGameList.vue";
export default {
  components: {
    HotGameList,
  },
  data() {
    return {
      gameBannerData: [
        {
          img: require("./images/tab1.png"),
          name: "Game sort",
          details: "",
        },
        {
          img: require("./images/tab2.png"),
          name: "Hot game",
          details: "",
        },
        {
          img: require("./images/tab3.png"),
          name: "Recent updates",
          details: "",
        },
      ],

      gameList: [
        {
          id: "001",
          imgUp: require("./images/game3_up.png"),
          imgLeft: require("./images/game3_left.png"),
          imgRight: require("./images/game3_right.png"),
          name: "ICE Rage",
          details: "Mountian Sheep",
        },
        {
          id: "002",
          imgUp: require("./images/game3_up.png"),
          imgLeft: require("./images/game3_left.png"),
          imgRight: require("./images/game3_right.png"),
          name: "The Night Clock",
          details: "Travelers Program",
        },
        {
          id: "003",
          imgUp: require("./images/game3_up.png"),
          imgLeft: require("./images/game3_left.png"),
          imgRight: require("./images/game3_right.png"),
          name:
            "Earth's deepest ice canyon vulnerable to melting How did Australia's Ruby Princess cruise happen? you can do it you can do this thing",
          details:
            "Other space data indica How did Australia's Ruby Princess cruise happen? you can do it you can do this thing",
        },
        {
          id: "004",
          imgUp: require("./images/game3_up.png"),
          imgLeft: require("./images/game3_left.png"),
          imgRight: require("./images/game3_right.png"),
          name:
            "How did Australia's Ruby Princess cruise happen? you can do it you can do this thing",
          details:
            "Other space data indica GREWHG How did Australia's Ruby Princess cruise happen? you can do it you can do this thing ",
        },
        {
          id: "005",
          imgUp: require("./images/game3_up.png"),
          imgLeft: require("./images/game3_left.png"),
          imgRight: require("./images/game3_right.png"),
          name:
            "Tom Hanks and Rita Wilson ‘feel better’ after coron gfdgf grdg How did Australia's Ruby Princess cruise happen? you can do it you can do this thing",
          details:
            "Other space data indica 规范和投入让他 How did Australia's Ruby Princess cruise happen? you can do it you can do this thing",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    window.scrollTo(0, 0);
  },
  mounted() {},
  destroyed() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // goToDetail(id) {
    //   //进入新闻详情
    //   this.$router.push({
    //     name: "newsDetail",
    //     query: {
    //       newsId: id,
    //     },
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.scroller-box {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 2.14rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .scroller-item {
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 0.24rem;
    color: #2e2e2e;
    .scoller-name {
      margin-top: 0.17rem;
    }
  }
}

.block-title-background {
  background-color: #fafafa00;
  font-size: 0.36rem;
}

.game-box {
  display: flex;
  flex-wrap: wrap;
  margin: 0;

  .game-item {
    box-sizing: border-box;
    width: 44%;
    margin: 0 0.13rem 0.3rem 0.3rem;

    .game {
      width: 100%;
      background: #fff;
      border-radius: 0.14rem;
      box-shadow: 0 0 0.1rem #efefef;
      box-sizing: border-box;
      padding-bottom: 0.2rem;
      .game-img {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .game-img-up {
          width: 100%;
          border-radius: 0.14rem 0.14rem 0 0;
          margin-bottom: 0.02rem;
        }

        .game-img-down {
          margin: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .img {
            width: 49.5%;
          }
          :nth-child(even) {
            margin: 0;
          }
        }
      }
      .game-name {
        font-weight: bold;
        font-size: 0.26rem;
        color: #2e2e2e;
      }
      .game-tips {
        font-size: 0.22rem;
        color: #333333;
      }
      .game-word {
        margin: 0;
        padding: 0.15rem 0.2rem 0 0.15rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
  :nth-child(even) {
    margin: 0 0.3rem 0.3rem 0.13rem;
  }
}
</style>
