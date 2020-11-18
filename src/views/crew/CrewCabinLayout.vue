<template>
  <section class="crew-income-statistics">
    <!-- crew-income-statistics -->
    <div class="top-ctn">
      <div class="back-ctn" @click="stepBack()">
        <i class="icon icon-back"></i>
        <span>
          {{ $t("Return") }}
        </span>
      </div>
      <div class="class-bar-ctn" v-if="layoutInfo">
        <div
          v-for="(item, index) in tabList"
          class="bar-item"
          :key="index"
          :class="{ active: active == item.value, hasNewMessage: true }"
          @click="scrollToSection(item.value)"
        >
          <span class="label">{{ item.name }}</span>
          <span class="message-count" v-if="messageCount[item.value] > 0">{{
            messageCount[item.value]
          }}</span>
        </div>
      </div>
    </div>

    <div class="content-ctn" ref="contentCtn">
      <div
        class="flight-layout-ctn"
        v-if="layoutInfo"
        :style="calcContentStyle(layoutInfo)"
      >
        <section
          class="section-ctn"
          v-for="(rowItemArr, sectionIndex) in layoutInfo.sectionArr"
          :key="sectionIndex"
          :ref="'section' + layoutInfo.seatType.valueArr[sectionIndex]"
        >
          <div class="section-title">
            {{
              layoutInfo.seatType.valueToName[
                layoutInfo.seatType.valueArr[sectionIndex]
              ]
            }}
          </div>
          <div class="section-content">
            <section
              class="row-ctn"
              v-for="(colArr, rowIndex) in rowItemArr"
              :key="rowIndex"
            >
              <div
                class="col-ctn"
                v-for="(seatArr, colIndex) in colArr"
                :key="colIndex"
              >
                <h6
                  @click.stop.prevent="clickSeatItem(seatItem)"
                  class="seat-ctn"
                  v-for="(seatItem, seatIndex) in seatArr"
                  :key="seatIndex"
                  :class="{
                    hasNewMessage: !seatMessageMap[seatItem.UserId],
                    disabled: !seatItem.UserId,
                  }"
                >
                  <span>
                    {{ seatItem.Name }}
                  </span>
                  <i class="icon icon-seat"></i>
                  <!-- 消息 -->
                  <div
                    class="seat-message-count"
                    v-if="seatMessageMap[seatItem.UserId]"
                  >
                    {{ seatMessageMap[seatItem.UserId].total }}
                  </div>
                  <div
                    class="message-tip"
                    v-if="
                      seatMessageMap[seatItem.UserId] &&
                      seatItem.UserId == showTipUserId
                    "
                  >
                    <div class="item-left">
                      {{ seatItem.Name }}
                    </div>
                    <!-- 消息不为空的情况 -->
                    <div
                      class="item-right"
                      v-if="seatMessageMap[seatItem.UserId].message.length > 0"
                    >
                      <div
                        class="message-ctn"
                        v-for="(messageItem, index) in seatMessageMap[
                          seatItem.UserId
                        ].message"
                        :key="index"
                      >
                        <span class="message-txt">{{
                          messageItem.content
                        }}</span>
                        <span
                          class="read-btn"
                          @click.stop.prevent="goToChat(seatItem)"
                          >{{ $t("go") }}</span
                        >
                      </div>
                    </div>
                    <!-- 消息为空的情况 -->
                    <div v-else class="item-right">
                      <div class="message-ctn">
                        <span
                          class="read-btn"
                          @click.stop.prevent="goToChat(seatItem)"
                          >{{ $t("go") }}</span>
                      </div>
                    </div>
                    <div class="triangle-ctn"></div>
                  </div>
                </h6>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
    <crew-chat
      v-if="curUserId"
      :curUserId="curUserId"
      @close="closeChatModal"
    ></crew-chat>
  </section>
</template>
<i18n>
	{
		"zh":{
			"Return":"返回",
			"go":"前往",
			"error":"信息有误"
		},
		"en":{
			"Return":"Return",
			"go":"go",
			"error":"Wrong information"
		}
	}
</i18n>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CabinLayoutService from '../../service/crew/cabin-layout';
import FlightSeatMatrix from './model/flight-seat-matrix';
import CrewChat from './CrewChat.vue';

@Component({
  name: 'CrewCatering',
  components: {
    CrewChat,
  },
})
export default class CrewCatering extends Vue {
  private layoutList: Array<any> = [];

  private active: string = 'firstClass';
  private tabList: Array<any> = [];

  private seatHeadLabelArr: Array<any> = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  private seatMessageMap: any = {};

  private showTipUserId = '';

  private docClickHandle: any = null;

  //展示聊天弹窗
  private showChatModal: boolean = false;

  private curUserId: string = '';

  private layoutInfo = null;

  private pageSize: number = 10;
  private pageNumber: number = 10;

  private msgListener: any = null;

  //历史信息

  // private tabList:Array<any> = [];

  //统计新消息数
  /* private get messageCount():void{
		
	} */

  private messageCount: any = {};
  public created() {
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
  }
  async mounted() {
    this.docClickHandle = (e) => {
      this.showTipUserId = '';
    };
    document.addEventListener('click', this.docClickHandle);
    this.startWebScoket();
    await this.getFlightSeatInfo();
    await this.getSeatMessageInfo();
  }

  private beforeDestroy() {
    document.removeEventListener('click', this.docClickHandle);
    (this as any).$globalEvent.$off('new_msg', this.msgListener);
  }

  //计算座舱布局的宽度
  private calcContentStyle(layoutInfo) {
    let unitWidth = 84 + 32;
    return {
      width: (unitWidth * layoutInfo.maxSeatLen) / 100 + 'rem',
    };
  }
  
  //关闭消息弹窗
  private closeChatModal(){
	  Object.keys(this.messageCount).forEach((seatType, index) => {
	    this.messageCount[seatType] = 0;
	  });
	  this.getSeatMessageInfo();
	  this.curUserId = '';
  }
  
  private stepBack() {
	  (this as any).$globalEvent.$emit('updateMessageCount');
    this.$router.push({
      name: 'crewCatering',
    });
  }

  private startWebScoket() {
    this.msgListener = (msg) => {
      console.log('layout:msg');
      Object.keys(this.messageCount).forEach((seatType, index) => {
        this.messageCount[seatType] = 0;
      });
      this.getSeatMessageInfo();
    };
    (this as any).$globalEvent.$on('new_msg', this.msgListener);
  }

  private scrollToSection(seatType) {
    this.active = seatType;
    this.$nextTick(() => {
      let scrollTop = this.$refs['section' + seatType][0].offsetTop;
      (this.$refs.contentCtn as any).scrollTop = scrollTop;
    });
  }

  private clickSeatItem(seatItem) {
    if (!seatItem.UserId) {
      //座位上没有用户
      this.showTipUserId = '';
    } else if (!this.seatMessageMap[seatItem.UserId]) {
      //有用户但是没有新消息
      this.goToChat(seatItem);
    } else if (
      this.seatMessageMap[seatItem.UserId] &&
      seatItem.UserId == this.showTipUserId
    ) {
      //有用户并且消息tip处于展示状态
      this.showTipUserId = '';
    } else if (
      this.seatMessageMap[seatItem.UserId] &&
      seatItem.UserId != this.showTipUserId
    ) {
      //有用户并且消息tip处于关闭状态
      this.showTipUserId = seatItem.UserId;
    } else {
      this.$toast(this.$i18n.t('error'));
    }
  }

  private goToChat(seatItem) {
    this.showTipUserId = '';
    this.curUserId = seatItem.UserId;
  }

  //获得航班的座位布局信息
  public getFlightSeatInfo(): void {
    CabinLayoutService.getFlightSeatInfo().then((resData: any) => {
      if (resData.code == '200') {
        let flightObj = new FlightSeatMatrix(resData.data);
        let tabList = [];
        this.layoutInfo = flightObj.getLayoutInfo();
        this.layoutInfo.seatType.valueArr.forEach((seatType, index) => {
          if (index == 0) {
            this.active = seatType;
          }
          tabList.push({
            name: this.layoutInfo.seatType.valueToName[seatType],
            value: seatType,
          });

          this.messageCount[seatType] = 0;
        });

        this.tabList = tabList;
      }
    });
  }

  //获取未读消息与座位的映射关系
  public getSeatMessageInfo(): void {
    CabinLayoutService.getSeatMessageInfo().then((resData: any) => {
      let seatMessageMap: any = {};
      if (resData.code == '200') {
        resData.data.forEach((item, index) => {
          seatMessageMap[item.UserId] = item;
          // this.messageCount[seatType] = 0;
		  if(!this.layoutInfo){
			  console.log('布局出错了');
			  // debugger;
			  this.messageCount = {};
			  return; 
		  }
          let seatType = this.layoutInfo.userSeatTypeMap[item.UserId];
          this.messageCount[seatType] =
            this.messageCount[seatType] + item.total;
        });
      }
      this.seatMessageMap = seatMessageMap;
    });
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  //$px为需要转换的字号
  @return $px / 100px * 1rem; //100px为根字体大小
}

.crew-income-statistics {
  width: 100%;
  // height: 100%;
  background: #002566;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1200;
  box-sizing: border-box;
  margin-bottom: 1.2rem;

  .top-ctn {
    position: relative;
    padding: rem(60px) rem(60px) 0;
    display: flex;
    align-items: center;
    z-index: 1000;
    background: #002566;

    .back-ctn {
      .icon {
        font-size: rem(40px);
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: rem(40px);
        margin-right: rem(8px);
      }
      span {
        font-size: rem(40px);
        font-family: PingFangSC-Semibold, PingFang SC;
        // font-weight:600;
        color: rgba(255, 255, 255, 1);
        line-height: rem(40px);
      }
    }
    .class-bar-ctn {
      margin-left: rem(130px);
      display: flex;
      .bar-item {
        position: relative;

        font-size: rem(40px);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: rem(40px);
        padding-bottom: rem(22px);
        margin-right: rem(90px);

        //激活状态
        &.active {
          &:after {
            position: absolute;
            content: "";
            height: rem(6px);
            background: rgba(132, 189, 0, 1);
            left: 0;
            bottom: 0;
            width: 100%;
          }
        }

        .hasNewMessage {
        }

        .message-count {
          display: inline-block;
          position: absolute;
          top: rem(-20px);
          right: rem(-30px);
          width: rem(40px);
          height: rem(40px);
          text-align: center;
          line-height: rem(40px);
          font-size: rem(26px);
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          background: rgba(254, 80, 0, 1);
          border-radius: 50%;
        }
      }
    }
  }

  .content-ctn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: rem(122px);
    overflow: auto;

    /* .flight-layout-ctn{
				display: flex;
				justify-content: center;
			} */

    .flight-layout-ctn {
      margin: auto;
      display: flex;
      justify-content: center;
      flex-direction: column;
      // padding:0 rem(420px);

      .section-ctn {
        .section-title {
          text-align: center;
          font-size: rem(40px);
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #4d6998;
          line-height: rem(60px);
          -webkit-background-clip: text;
          // -webkit-text-fill-color:transparent;
          margin-top: rem(120px);
          margin-bottom: rem(54px);
        }

        /* .section-number-laber{
					} */

        .section-number-laber {
          display: flex;
          justify-content: flex-start;

          .seat-head-label {
            width: rem(84px);
            font-size: rem(32px);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: rem(32px);
            margin-bottom: rem(34px);
          }
        }

        .section-content {
          .row-ctn {
            display: flex;
            justify-content: space-between;
            margin-bottom: rem(56px);

            .col-ctn {
              display: flex;
              justify-content: space-between;
              .seat-ctn {
                position: relative;
                display: inline-block;
                width: rem(84px);
                height: rem(84px);
                text-align: center;
                margin-right: rem(32px);

                &.disabled {
                  .icon {
                    color: #4d6998 !important;
                  }
                }

                &.hasNewMessage {
                }

                > span {
                  text-align: center;
                  color: green;
                  width: 100%;
                  font-size: rem(30px);
                  line-height: rem(84px);
                  padding-top: 0.5rem;
                  display: block;
                  position: absolute;
                }
                .icon {
                  color: #ffffff;
                  font-size: rem(84px);
                  line-height: rem(84px);
                }

                .seat-message-count {
                  display: inline-block;
                  position: absolute;
                  top: rem(-10px);
                  right: rem(-10px);
                  width: rem(40px);
                  height: rem(40px);
                  text-align: center;
                  line-height: rem(40px);
                  font-size: rem(26px);
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
                  background: rgba(254, 80, 0, 1);
                  border-radius: 50%;
                }

                .message-tip {
                  position: absolute;
                  left: 50%;
                  bottom: 100%;

                  margin-bottom: rem(26px);
                  padding: 0 rem(30px);
                  transform: translateX(-50%);
                  box-sizing: border-box;
                  min-width: rem(460px);
                  max-width: rem(800px);
                  border-radius: rem(32px);
                  background: rgba(0, 47, 114, 1);
                  box-shadow: 0px rem(13px) rem(14px) 0px rgba(0, 0, 0, 0.13);
                  border: rem(4px) solid rgba(175, 213, 253, 1);

                  .item-left {
                    position: absolute;
                    left: rem(30px);
                    top: 50%;
                    transform: translateY(-50%);

                    width: rem(68px);
                    height: rem(36px);
                    background: rgba(0, 174, 199, 1);
                    box-shadow: 0px rem(13px) rem(14px) 0px rgba(0, 0, 0, 0.13);
                    border-radius: rem(6px);

                    font-size: rem(22px);
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 1);
                    line-height: rem(36px);
                    text-shadow: 0px rem(13px) rem(14px) rgba(0, 0, 0, 0.13);
                  }
                  .item-right {
                    margin-left: rem(114px);

                    .message-ctn {
                      text-align: left;
                      position: relative;
                      height: rem(66px);
                      padding-right: rem(80px);
                      &:not(:last-child) {
                        border-bottom: rem(2px) solid #afd5fd;
                      }
                      .message-txt {
                        text-align: left;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;

                        font-size: rem(24px);
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: rgba(255, 255, 255, 1);
                        line-height: rem(66px);
                      }
                      .read-btn {
                        position: absolute;
                        top: rem(20px);
                        right: 0;
                        width: rem(56px);
                        height: rem(28px);
                        box-shadow: 0px rem(13px) rem(14px) 0px
                          rgba(0, 0, 0, 0.13);
                        border-radius: rem(6px);
                        border: rem(1px) solid rgba(175, 213, 253, 1);
                        text-align: center;
                        line-height: rem(26px);
                        font-size: rem(20px);
                        color: rgba(175, 213, 253, 1);
                      }
                    }
                  }

                  .triangle-ctn {
                    position: absolute;
                    bottom: rem(-10px);
                    left: 50%;
                    width: rem(10px);
                    height: rem(10px);
                    transform: translateX(-50%) rotate(-45deg);
                    border-left: rem(4px) solid rgba(175, 213, 253, 1);
                    border-bottom: rem(4px) solid rgba(175, 213, 253, 1);
                    background: rgba(0, 47, 114, 1);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
