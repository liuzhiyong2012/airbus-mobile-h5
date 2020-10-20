<template>
  <div class="crew-statistic-chart">
    <div class="charts-ctn">
      <div ref="pieCtn" class="pie-ctn"></div>
      <p>
        {{ title }}
      </p>
    </div>

    <div class="statistic-detail-ctn">
      <div class="detail-item" v-for="(item, index) in dataList" :key="index">
        <div
          v-if="type == 'dataPackage'"
          class="img-ctn"
          :style="[imageMap[item.Name]?{ backgroundImage: `url(${imageMap[item.Name]})`}:{backgroundColor:colorArr[index]}]"
        >
          {{ item.Name.substring(0,2) }}
        </div>

        <div
          v-if="type != 'dataPackage'"
          class="img-ctn"
          :style="[item.SampleImgPath?{ backgroundImage: `url(${item.SampleImgPath})` }:{backgroundColor:colorArr[index]}]"
        ></div>

        <div class="progress-ctn">
          <div class="top-ctn">
            <span>{{ item.Name }}</span>
            <span class="dot"></span>
            <span>${{ item.getMoney }}</span>
          </div>

          <div class="bottom-ctn">
            <div
              class="progress-bar"
              :style="{
                width: item.percent + '%',
                backgroundColor: colorArr[index],
              }"
            ></div>
            <div class="percent">
              {{ item.percent + "%" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<i18n>
	{
		"zh":{
		},
		"en":{
		}
	}
</i18n>
<script lang = "ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import echarts from "echarts";
import UrlUtils from "../../../utils/url-utils";

@Component({
  name: "CrewStatisticChart",
  components: {},
})
export default class CrewStatisticChart extends Vue {
  @Prop({
    default: () => {
      return "";
    },
  })
  title: string;

  @Prop({
    default: () => {
      return "";
    },
  })
  type: string;

  private imageMap: any = {
    "ALL-DAY Pass": require("../images/data_package_1.png"),
    "1GB": require("../images/data_package_2.png"),
    "50MB": require("../images/data_package_3.png"),
  };

  private colorArr: Array<any> = [
    "#00AEC7",
    "#FE5000",
    "#84BD00",
    "#A51890",
    "#E1E000",
    "#DA1884",
    "#E4002B",
    "#0081FF",
    "#0C9254",
    "#6500D4",
  ];

  private dataList: Array<any> = [];

  private chart: any = {};

  private mounted(): void {
    this.chart = echarts.init((this as any).$refs.pieCtn);
    // this.renderCharts();
  }

  public renderCharts(dataArr: Array<any>) {
    let chartArr = [];
    let total: number = 0;

    dataArr.forEach((item, index) => {
      item.getMoney = Number(item.getMoney);
      total = total + item.getMoney;
    });

    if (total != 0) {
      dataArr.forEach((item: any, index: number) => {
        chartArr.push({
          name: item.Name,
          value: item.getMoney,
        });

        item.percent = ((item.getMoney / total) * 100).toFixed();
        item.SampleImgPath = UrlUtils.addBaseUrl(
          UrlUtils.delBaseUrl(item.SampleImgPath)
        );
      });
    } else {
      dataArr.forEach((item: any, index: number) => {
        chartArr.push({
          name: item.Name,
          value: item.getMoney,
        });

        item.percent = 0
        item.SampleImgPath = UrlUtils.addBaseUrl(
          UrlUtils.delBaseUrl(item.SampleImgPath)
        );
      });
    }

    this.dataList = dataArr.splice(0, 3);

    this.chart.clear();
    let option = {
      title: {
        //标题组件
        textStyle: {
          color: "#333333",
          fontSize: 20,
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        textStyle: {
          //图例文字的样式
          color: "#fff", //文字颜色
          fontSize: 25, //文字大小
        },
      },
      graphic: [
        {
          type: "text",
          top: "44%",
          left: "center",
          style: {
            text: total.toFixed(2),
            fill: "#A6A8B6",
            fontSize: 30,
            fontWeight: "normal",
          },
        },
        {
          type: "text",
          top: "53%",
          left: "center",
          style: {
            // text: "Total Revenue",
            text: "",
            fill: "#A6A8B6",
            fontSize: 30,
            fontWeight: "normal",
          },
        },
      ],
      //圆环的颜色
      color: this.colorArr,
      // 图例
      legend: {
        // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。
        selectedMode: true, //图例在垂直方向上面显示居中
        /* orient: 'vertical', */
        /*  x : 'right',   //图例显示在右边
        y: 'center',  */
        bottom: 0,
        itemWidth: 10, //图例标记的图形宽度
        itemHeight: 10, //图例标记的图形高度
        data: ["基本工资", "福利奖金", "出差补贴", "交补话补", "岗位工资"],
        textStyle: {
          //图例文字的样式
          color: "#A6A8B6", //文字颜色
          fontSize: 10, //文字大小
        },
      },
      series: [
        {
          name: "占比图", //代表a的值，系列名称
          type: "pie",
          center: ["50%", "45%"], //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
          radius: ["65%", "80%"], //饼图的半径，数组的第一项是内半径，第二项是外半径。[ default: [0, '75%'] ]
          avoidLabelOverlap: false, //是否禁用动画效果
          /*  animation: false, */
          label: {
            normal: {
              show: false, //是否显示标签
              //// 标签的位置。'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区。'inside','inner' 同 'inside',饼图扇区内部。'center'在饼图中心位置。
              position: "left",
              //显示的标签的内容
              //a（系列名称），b（数据项名称），c（数值）, d（百分比）
              formatter: "{a},{b}:{c}（{d}%）", //  ![在这里插入图片描述](https://img-blog.csdn.net/2018101313580390?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5MzI3NDE4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
            },
            emphasis: {
              //鼠标放在圆环上显示的标签样式
              show: false,
              textStyle: {
                fontSize: "12",
                fontWeight: "bold",
              },
            },
          },
          labelLine: {
            normal: {
              show: false, //是否显示引导线
              length: 10, //百分比引导线
              length2: 20, //视觉引导项第二段的长度。
            },
          },
          itemStyle: {
            normal: {
              borderColor: "#FFFFFF",
              borderWidth: 1,
              label: {
                show: true,
                formatter: "{d}%",
              },
            },
          },
          // 系列中的数据内容数组。
          data: chartArr,
        },
      ],
    };
    this.chart.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  //$px为需要转换的字号
  @return $px / 100px * 1rem; //100px为根字体大小
}

.crew-statistic-chart {
  padding-top: rem(20px);
  //   padding-top: rem(120px);

  .charts-ctn {
    // margin-bottom: rem(80px);
    margin-bottom: rem(20px);
    .pie-ctn {
      margin: auto;
      width: rem(460px);
      height: rem(460px);
      margin-bottom: rem(50px);
    }

    p {
      font-size: rem(32px);
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      line-height: rem(32px);
    }
  }

  .statistic-detail-ctn {
    .detail-item {
      display: flex;
      align-items: center;
      padding: 0 rem(50px);
      justify-content: space-between;
      margin-bottom: rem(40px);

      .img-ctn {
        white-space: nowrap;
        overflow: hidden;
        line-height: rem(102px);
        font-size: rem(24px);
        color: #ffffff;
        text-align: center;
        width: rem(98px);
        height: rem(98px);
        border-radius: rem(30px);
        border: rem(2px) solid rgba(32, 66, 130, 1);
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .progress-ctn {
        width: rem(356px);
        .top-ctn {
          display: flex;
          align-items: center;
          margin-bottom: rem(12px);

          span {
            &.dot {
              border-radius: 50%;
              margin: 0 rem(10px);
              display: inline-block;
              width: rem(7px);
              height: rem(7px);
              background: rgba(255, 255, 255, 1);
              opacity: 0.2;
            }

            font-size: rem(28px);
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            line-height: rem(28px);
          }
        }

        .bottom-ctn {
          position: relative;
          height: rem(20px);
          background: rgba(8, 40, 99, 1);
          border-radius: rem(20px);
          // overflow: hidden;

          .progress-bar {
            overflow: hidden;
            height: 100%;
            background: rgba(0, 174, 199, 1);
            border-radius: 20px;
          }

          .percent {
            position: absolute;
            left: 100%;
            margin-left: rem(20px);
            top: 50%;
            font-size: rem(24px);
            font-family: Helvetica;
            color: rgba(255, 255, 255, 1);
            line-height: rem(24px);
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
</style>

