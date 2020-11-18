<template>
  <section class="crew-catering-item">
    <div
      class="img-ctn"
      :style="{ backgroundImage: `url(${data.SampleImgPath})` }"
    ></div>

    <div class="info-ctn">
      <div class="info-left-ctn">
        <div class="line-one">
          <span>{{ data.Seat }}</span>
          <!-- <span>3min</span> -->
          <!-- <span>{{ data.TimeAgo }}</span> -->
          <span>{{ data.CreatedAt }}</span>
        </div>
        <div class="line-two">{{ data.Name }}  ${{ data.Price }}  <i>X{{data.Quantity}}</i></div>
      </div>

      <div class="info-right-ctn">
        <span class="price-ctn">${{ Number(data.Price)*data.Quantity }}</span>
        <span class="finish-ctn" v-if="data.status == '0'" @click="finish">{{
          $t("Finish")
        }}</span>
      </div>
    </div>
  </section>
</template>
<i18n>
	{
		"zh":{
			"Finish":"完成"
		},
		"en":{
			"Finish":"Finish"
		}
	}
</i18n>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "CrewGoodsItem",
  components: {},
})
export default class CrewGoodsItem extends Vue {
  @Prop()
  data: Array<any>;

  private finish() {
    this.$emit("finish", this.data);
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 100px * 1rem; //100px为根字体大小
}

.crew-catering-item {
  position: relative;
  // width: rem(976px);
  width: rem(830px);
  height: rem(140px);
  border-radius: rem(30px);
  box-sizing: border-box;
  overflow: hidden;
  border: rem(4px) solid rgba(175, 213, 253, 1);
  margin-bottom: rem(40px);
  margin-right: 0.4rem;

  .img-ctn {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: rem(132px);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .info-ctn {
    height: 100%;
    margin-left: rem(132px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 rem(50px) 0 rem(32px);

    .info-left-ctn {
      .line-one {
        span:nth-child(1) {
          padding: 0 rem(12px);
          height: rem(36px);
          color: rgba(255, 255, 255, 1);
          background: rgba(0, 174, 199, 1);
          border-radius: 6px;
        }
        span:nth-child(2) {
          margin-left: rem(12px);
          font-size: rem(24px);
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(175, 213, 253, 1);
          line-height: rem(24px);
        }
        margin-bottom: rem(20px);
      }
      .line-two {
        font-size: rem(28px);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: rem(28px);
      }
    }

    .info-right-ctn {
      .price-ctn {
        font-size: rem(32px);
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: rem(32px);
      }
      .finish-ctn {
        margin-left: rem(20px);
        display: inline-block;
        text-align: center;
        line-height: rem(52px);
        width: rem(140px);
        height: rem(52px);
        background: rgba(132, 189, 0, 1);
        border-radius: rem(36px);

        font-size: rem(24px);
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
