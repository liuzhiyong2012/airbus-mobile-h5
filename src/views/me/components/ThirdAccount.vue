<template>
  <div class="abus-height">
    <abus-title :title="$t('title')" backRouteName="meIndex"></abus-title>
    <div class="cell-group mt2">
      <van-radio-group
        v-model="radio"
        direction="horizontal"
        checked-color="#00205B"
        icon-size="4em"
      >
        <div class="cell-item">
          <div class="title">Wechat</div>
          <div class="f1">
            <van-radio name="0">
              <template #icon="props">
                <svg class="icon icon-right" aria-hidden="true">
                  <use v-if="props.checked" xlink:href="#icon-wechat_1" />
                  <use v-else xlink:href="#icon-wechat-disable" />
                </svg>
              </template>
            </van-radio>
            <!-- <svg class="icon icon-right" aria-hidden="true">
              <use xlink:href="#icon-wechat_1" />
            </svg>-->
          </div>
        </div>

        <div class="cell-item">
          <div class="title">Facebook</div>
          <div class="f1">
            <van-radio name="1">
              <template #icon="props">
                <svg class="icon icon-right" aria-hidden="true">
                  <use v-if="props.checked" xlink:href="#icon-facebook_1" />
                  <use v-else xlink:href="#icon-facebook-disable" />
                </svg>
              </template>
            </van-radio>
          </div>
        </div>

        <div class="cell-item">
          <div class="title">Line</div>
          <div class="f1">
            <van-radio name="2">
              <template #icon="props">
                <svg class="icon icon-right" aria-hidden="true">
                  <use v-if="props.checked" xlink:href="#icon-line_1" />
                  <use v-else xlink:href="#icon-line-disable" />
                </svg>
              </template>
            </van-radio>
          </div>
        </div>
      </van-radio-group>
    </div>
  </div>
</template>
<i18n>
	{
		"zh":{
			"title":"第三方账户",
      "QTY":"剩余量",
      "Point":"积分"
		},
		"en":{
			"title":"Third Party Account",
      "QTY":"QTY",
      "Point":"Point"
		}
	}
</i18n>
<script>
import AbusTitle from "../../../components/AbusTitle.vue";
export default {
  components:{
    AbusTitle
  },
  data() {
    return {
      radio: "0"
    };
  },
  mounted() {
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  },
};
</script>

<style lang="scss" scoped>
.mt2 {
  margin: 0.2rem 0 0 0;
}
.van-radio-group--horizontal {
  display: block;
}
.van-radio__icon{
  height: 4em !important;
}
.van-radio__icon--round{
  width: 100%;
  height: 4em !important;
}
.cell-group {
  background-color: #fff;
  .cell-item {
    display: flex;
    padding: 0 0.3rem;
    line-height: 1rem;
    .title {
      font-size: 0.32rem;
      color: rgba(51, 51, 51, 1);
    }
    .f1 {
      position: relative;
      flex: 1;
      .icon-right {
        position: absolute;
        right: -0.3rem;
        padding: 0.3rem;
      }
      .icon-right-1 {
        position: absolute;
        right: 0.1rem;
        padding: 0.3rem;
      }
      .icon-right-2 {
        position: absolute;
        right: 0.3rem;
        color: #999;
        max-width: 2.2rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>