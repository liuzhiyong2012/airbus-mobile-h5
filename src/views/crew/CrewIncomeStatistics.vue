<template>
  <section class="crew-income-statistics">
    <div class="charts-statistic-ctn">
      <crew-statistic-chart
        ref="dishStatisticChart"
        title="Catering"
      ></crew-statistic-chart>
    </div>
    <div class="charts-statistic-ctn">
      <crew-statistic-chart
        ref="netFlowStatisticChart"
        title="Data package"
        type="dataPackage"
      ></crew-statistic-chart>
    </div>
    <div class="charts-statistic-ctn">
      <crew-statistic-chart
        ref="shoppingStatisticChart"
        title="Goods"
      ></crew-statistic-chart>
    </div>
  </section>
</template>

<i18n>
	{
		"zh":{
			"toast1":"获取数据失败"
		},
		"en":{
			"toast1":"Failed to get list"
		}
	}
</i18n>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CrewStatisticChart from "./components/CrewStatisticChart.vue";
import IncomeStatisticsService from "../../service/crew/income-statistics";

@Component({
  name: "CrewCatering",
  components: {
    CrewStatisticChart,
  },
})
export default class CrewCatering extends Vue {
  private dishStatistic: any = {};
  private netFlowStatistic: any = {};
  private arr: Array<any> = [
    {
      Name: "No data available ",
      getMoney: 0,
    },
    {
      Name: "No data available  ",
      getMoney: 0,
    },
    {
      Name: "No data available   ",
      getMoney: 0,
    },
  ];
  private arr1: Array<any> = [
    {
      Name: "No data available ",
      getMoney: 0,
    },
    {
      Name: "No data available  ",
      getMoney: 0,
    },
    {
      Name: "No data available   ",
      getMoney: 0,
    },
  ];
  private arr2: Array<any> = [
    {
      Name: "No data available ",
      getMoney: 0,
    },
    {
      Name: "No data available  ",
      getMoney: 0,
    },
    {
      Name: "No data available   ",
      getMoney: 0,
    },
  ];
  private shoppingStatistic: any = {};
  public created() {
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  }

  private mounted(): void {
    this.getAccountForDish();
    this.getAccountForNetFlow();
    this.getAccountForShopping();
  }

  private getAccountForDish(): void {
    var _this = this;
    IncomeStatisticsService.getAccountForDish({}).then((resData: any) => {
      if (resData.code == "200") {
        if (resData.data.length > 0) {
          (this.$refs.dishStatisticChart as any).renderCharts(resData.data);
        } else {
          (this.$refs.dishStatisticChart as any).renderCharts(this.arr);
        }
      } else {
        this.$toast(this.$i18n.t("toast1"));
      }
    });
  }

  private getAccountForNetFlow(): void {
    IncomeStatisticsService.getAccountForNetFlow({}).then((resData: any) => {
      if (resData.code == "200") {
        if (resData.data.length > 0) {
          (this.$refs.netFlowStatisticChart as any).renderCharts(resData.data);
        } else {
          (this.$refs.netFlowStatisticChart as any).renderCharts(this.arr1);
        }
        
      } else {
        this.$toast(this.$i18n.t("toast1"));
      }
    });
  }

  private getAccountForShopping(): void {
    IncomeStatisticsService.getAccountForShopping({}).then((resData: any) => {
      if (resData.code == "200") {
        if (resData.data.length > 0) {
          (this.$refs.shoppingStatisticChart as any).renderCharts(resData.data);
        } else {
          (this.$refs.shoppingStatisticChart as any).renderCharts(this.arr2);
        }
        
      } else {
        this.$toast(this.$i18n.t("toast1"));
      }
    });
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/index.scss";

@function rem($px) {
  //$px为需要转换的字号
  @return $px / 100px * 1rem; //100px为根字体大小
}

.crew-income-statistics {
  display: flex;
  position: relative;
  padding: 0 rem(90px);
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .charts-statistic-ctn {
    width: 6rem;
    // background: grey;
    height: 100%;
  }
}
</style>
