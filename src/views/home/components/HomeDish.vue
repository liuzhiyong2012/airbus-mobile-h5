<template>
  <div>
    <div class="abus-scroller-box" :style="{'backgroundColor': isHaveData?'#fff':'#f2f4f7'}">
      <scroller>
        <div
          slot="list"
          v-for="(item, index) of recomendList"
          :key="index"
          @click="stepToDetail(item)"
        >
          <div class="s-box s-box-right" v-if="index+1 == recomendList.length">
            <div class="img-box">
              <div class="img">
                <img :src="item.SampleImgPath|addBaseUrl" :alt="item.Name" width="100%" />
              </div>
            </div>
            <div class="name">{{item.Name}}</div>
            <div class="price">${{item.Price}}</div>
          </div>
          <div class="s-box" v-else>
            <div class="img-box">
              <div class="img">
                <img :src="item.SampleImgPath|addBaseUrl" :alt="item.Name" width="100%" />
              </div>
            </div>
            <div class="name">{{item.Name}}</div>
            <div class="price">${{item.Price}}</div>
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
import DishService from "../../../service/dish";
Scroller.install(Vue);
export default {
  components: {
    Scroller,
  },
  data() {
    return {
      recomendList: [],
      isHaveData: false,
      dishData: [
        {
          img: require("../images/food.png"),
          name: "Pock rice",
          price: "10",
        },
        {
          img: require("../images/shopping.jpg"),
          name: "Pock rice",
          price: "14",
        },
        {
          img: require("../images/food.png"),
          name: "Pock ricePock ricePock rice",
          price: "10",
        },
        {
          img: require("../images/shopping.jpg"),
          name: "Pock rice",
          price: "14",
        },
        {
          img: require("../images/food.png"),
          name: "Pock rice",
          price: "10",
        },
        {
          img: require("../images/shopping.jpg"),
          name: "Pock rice",
          price: "14",
        },
        {
          img: require("../images/food.png"),
          name: "Pock rice",
          price: "10",
        },
        {
          img: require("../images/shopping.jpg"),
          name: "Pock rice",
          price: "14",
        },
      ],
    };
  },
  created() {
    this.getDishesRecommendedList();
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  },
  methods: {
    stepToDetail(item) {
      var _this = this
      if (item.Stocking > 0) {
        _this.$router.push({
          name: "dishDetail",
          query: {
            id: item.Id,
          },
        });
      } else {
        if (localStorage.getItem("lang") == "en") {
          _this.$toast("Stockout!");
        } else {
          _this.$toast("暂时缺货");
        }
      }
      // this.$router.push({
      //   name: "dishDetail",
      //   query: {
      //     id: item.Id,
      //   },
      // });
    },
    getDishesRecommendedList() {
      DishService.getDishesRecommendedList({}).then((res) => {
        this.isHaveData = true;
        this.recomendList = res.data.RecommendedDishes;

        this.recomendList.forEach((item, index) => {
          item.BannerImgPath =
            "http://172.16.125.11:8010/fcf29d23-6af0-45d5-a2e6-90ccc95d0457";
        });

        /* :version/api/Dishes/List */
        /*  BannerImgPath: "172.16.125.11:8010/133b9f0b-dfa4-4cd9-8ebb-958c44bfbf26"
            Id: "e2dc9e2c-6733-e911-b13c-96af276fddb7"
            Name: "素食拼盘"
            Price: 32
            Remark: null
            SampleImgPath: "172.16.125.11:8010/eb8ea336-9434-4295-8215-3821c76baba8"
            Status: 0
            Stocking: 0 */
        // http://172.16.125.11:8010/50.jpg
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.s-box {
  float: left;
  // height: 1.6rem;
  margin: 0 0 0 0.28rem;
  border-radius: 0.08rem;
  width: 1.6rem;
  .img-box {
    display: flex;
    align-items: center;
    width: 1.6rem;
    height: 1.6rem;
    text-align: center;
    box-shadow: 0 0 0.08rem #efefef;
    overflow: hidden;
    .img {
      width: 100%;
      border-radius: 0.1rem;
    }
  }

  .name {
    line-height: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    height: 0.5rem;
    color: rgb(51, 51, 51);
  }
  .price {
    color: rgb(0, 32, 91);
    font-size: 0.24rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.s-box-right {
  margin-right: 0.82rem;
}
</style>