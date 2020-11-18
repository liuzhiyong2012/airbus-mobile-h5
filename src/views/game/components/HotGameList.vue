<template>
  <div>
    <h2 class="abus-block-title">
      <van-cell title="Hot game" class="block-title-background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>
    <!-- <div class="abus-scroller-box"> -->
    <div class="scroller-box">
      <scroller>
        <div slot="list" v-for="(item, index) of gameData" :key="index">
          <div class="s-box s-box-right" v-if="index + 1 == gameData.length">
            <div class="s-imgbox">
              <div class="img">
                <img :src="item.img" :alt="item.name" width="100%"/>
              </div>
              <div class="cover"></div>
              <p class="s-name">{{ item.name }}</p>
              <p class="s-tips">{{ item.tips }}</p>
            </div>
          </div>
          <div class="s-box" v-else>
            <div class="s-imgbox">
              <div class="img">
                <img :src="item.img" :alt="item.name" width="100%"/>
              </div>
              <div class="cover"></div>
              <p class="s-name">{{ item.name }}</p>
              <p class="s-tips">{{ item.tips }}</p>
            </div>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Scroller from "@nutui/nutui/dist/packages/scroller/scroller.js"; // 加载构建后的JS
import "@nutui/nutui/dist/packages/scroller/scroller.css";
Scroller.install(Vue);
export default {
  components: {
    Scroller,
  },
  data() {
    return {
      gameData: [
        {
          img: require("../images/hotGame1.png"),
          name: "Soulite Monsters",
          tips: "Explore monsters ex monsters",
        },
        {
          img: require("../images/hotGame1.png"),
          name: "Soulite egfwhtrs",
          tips: "Explorters explore monsters",
        },
        {
          img: require("../images/hotGame1.png"),
          name: "ite hdnsters",
          tips: "Expre monsters",
        },
        {
          img: require("../images/hotGame1.png"),
          name: "Soute Monsters",
          tips: "Explore monsters explore monsters",
        },
        {
          img: require("../images/hotGame1.png"),
          name: "ulite sters",
          tips: "lore rs exlore monsters",
        },
        {
          img: require("../images/hotGame1.png"),
          name: "hshlite kuyrkuytrs",
          tips: "Expe monsters explore monsters",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.block-title-background {
  background-color: #fafafa00;
  font-size: 0.36rem;
}
.scroller-box {
  margin-right: 0.28rem;
}

.s-box {
  float: left;
  margin: 0 0 0 0.28rem;
  border-radius: 0.08rem;
  width: 5.6rem;

  .img {
    width: 100%;
    border-radius: 0.1rem;
    box-shadow: 0 0 0.08rem #efefef;
  }
  .s-imgbox {
    position: relative;
    .cover {
      position: absolute;
      width: 100%;
      height: 1rem;
      bottom: 0.02rem;
      left: 0;
      border-radius: 0 0 0.1rem 0.1rem;
      background-color: #00205b;
      opacity: 0.4;
    }

    .s-name {
      position: absolute;
      bottom: 0.56rem;
      left: 0;
      margin-left: 0.2rem;
      height: 0.34rem;
      line-height: 0.34rem;
      font-size: 0.28rem;
      font-weight: bold;
      color: #fff;
      text-shadow: 0px 2px 4px rgba(15, 35, 61, 0.14);
    }
    .s-tips {
      position: absolute;
      bottom: 0.22rem;
      left: 0;
      margin-left: 0.2rem;
      height: 0.22rem;
      line-height: 0.22rem;
      font-size: 0.2rem;
      font-family: PingFangSC-Regular, PingFang SC;
      color: rgba(208, 217, 224, 1);
    }
  }
}
.s-box-right {
  // margin-right: 0.82rem;
  margin-right: 0.28rem;
}
</style>
