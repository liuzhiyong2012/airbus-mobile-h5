<template>
  <section class="crew-chat">
    <!-- crew-income-statistics -->
    <div class="top-ctn">
      <div class="back-ctn" @click="stepToLayout()">
        <i class="icon icon-back"></i>
        <span>{{ $t("return") }}</span>
      </div>
    </div>

    <div class="content-ctn">
      <div class="content-ctt">
        <div class="aside-ctn">
          <van-swipe-cell
            v-for="(item, index) in messageUserList"
            :key="index"
            class="mysong-swipe-item"
            @hello="playSong(index)"
          >
            <template #right>
              <div class="delete-btn">
                <i class="icon icon-trash" @click="deleteUser(index, item)"></i>
              </div>
            </template>
            <div
              class="user-item"
              :class="{ active: activeUserId == item.Id }"
              @click="activeChat(item.Id)"
            >
              <div class="heade-img">{{ item.NickName }}</div>
              <div class="info-ctn">
                <div class="info-top-ctn">
                  <span>{{ item.SeatNumber }}</span>
                  <span>{{ item.created_time }}</span>
                </div>
                <p class="info-bottom-ctm">{{ item.content }}</p>
              </div>
              <div
                class="message-count"
                v-if="newMsgCount[item.Id] && newMsgCount[item.Id] > 0"
              >
                {{ newMsgCount[item.Id] }}
              </div>
            </div>
          </van-swipe-cell>
        </div>

        <div class="main-ctn">
          <div ref="messageCtn" class="message-ctn">
            <!--<van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadUnreadData()" :offset="100" :immediate-check="false" ref="mylist">-->
            <div class="inner-ctn">
              <van-pull-refresh v-model="refreshing" @refresh="loadReadData">
                <div
                  class="message-item-ctn"
                  v-for="(item, index) in messageList"
                  :key="index"
                >
                  <div
                    class="message-item"
                    :class="{
                      left: item.sendType == 1,
                      right: item.sendType != 1,
                    }"
                  >
                    <div v-if="item.sendType == 1">
                      <div class="heade-img">
                        {{ item.fromNickName }}
                      </div>
                      <div class="info-ctn">
                        <div class="info-top-ctn">
                          <span>{{ item.seatNumber }}</span>
                          <span>{{
                            item.created_time | dateFormate("hh:mm:ss")
                          }}</span>
                        </div>
                        <p class="info-bottom-ctm">{{ item.content }}</p>
                      </div>
                    </div>
                    <div v-if="item.sendType == 2">
                      <div class="heade-img">
                        {{ $t("me") }}
                      </div>
                      <div class="info-ctn">
                        <div class="info-top-ctn">
                          <span>{{
                            item.created_time | dateFormate("hh:mm:ss")
                          }}</span>
                          <span></span>
                        </div>
                        <p class="info-bottom-ctm">{{ item.content }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </van-pull-refresh>
            </div>
            <!--</van-list>-->
          </div>

          <div class="oper-ctn">
            <div class="input-ctn">
              <textarea type="text" v-model="inputMessage"></textarea>
            </div>
            <div class="submit-ctn" @click="sendMessage()">
              {{ $t("send") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<i18n>
	{
		"zh":{
			"return":"返回",
			"me":"我",
			"send":"发送"
		},
		"en":{
			"return":"Return",
			"me":"Me",
			"send":"Send"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CabinLayoutService from "../../service/crew/cabin-layout";
import FlightSeatMatrix from "./model/flight-seat-matrix";
import ArrayUtils from "../../utils/array-utils";
import { localStore } from "../../utils/data-management";

@Component({
  name: "CrewChat",
  components: {},
})
export default class CrewChat extends Vue {
  @Prop()
  curUserId: string;

  private activeUserId: string = "";

  private userList: Array<any> = [];

  private messageList: Array<any> = [];

  private layoutList: Array<any> = [];

  private active: string = "firstClass";

  private inputMessage: string = "";
  private socket: any = null;

  private messageArr = [];

  private newMsgCount = {};

  private messageUserList: Array<any> = [];

  private beforeTime: number = new Date().getTime();
  private pageSize: number = 10;
  private pageNumber: number = 1;

  private refreshing: boolean = false;
  private loading: boolean = false;
  private finished: boolean = false;
  private msgListener: any = null;
  public created() {
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  }
  async mounted() {
    this.getSeatMessageInfo();
    //拉取已读消息
    this.activeChat(this.curUserId);
    this.startWebScoket();
    this.handleUserList();
    //拉取未读消息
    /*1.从本地缓存获取所有的聊天记录的用户id
			userIdArr:[
		
			]
			2.获取有新消息的用户。
			3.如果不前10则将他排到前面来*/
  }

  private loadUnreadData(): void {
    localStorage.getItem("lang") == "en";
    //messageUserIdArr
  }

  //doing
  private deleteUser(index, item) {
    this.readAirBusMessage(item.Id, () => {
      let cacheUserList = localStore.get("cacheUserList") || [];
      this.messageUserList.splice(index, 1);
      cacheUserList.splice(index, 1);
      localStore.set("cacheUserList", cacheUserList);
      this.$forceUpdate();
    });
  }

  private handleUserList(): void {
    let cacheUserList = localStore.get("cacheUserList") || [];
    let beforeIndex = 10;

    CabinLayoutService.getSeatMessageInfo().then((resData: any) => {
      if (resData.code == "200") {
        resData.data.reverse().forEach((item, index) => {
          //放在最前面
          let indexInArray = cacheUserList.indexOf(item.UserId);
          if (indexInArray > -1) {
            cacheUserList.splice(indexInArray, 1);
            cacheUserList.unshift(item.UserId);
          } else {
            cacheUserList.unshift(item.UserId);
          }
        });

        //将当前用户放置在最前面
        let activeUserIndex = cacheUserList.indexOf(this.activeUserId);

        if (activeUserIndex > -1) {
          cacheUserList.splice(activeUserIndex, 1);
          cacheUserList.unshift(this.activeUserId);
        } else {
          cacheUserList.unshift(this.activeUserId);
        }
        CabinLayoutService.getUserMessageByUserIdArr({
          messageUserList: cacheUserList,
        }).then((resData: any) => {
          if (resData.code == 200) {
            this.messageUserList = resData.data;
            this.messageUserList.forEach((item, index) => {
              this.newMsgCount[item.Id] = item.count.length || 0;
            });
          }
        });

        localStore.set("cacheUserList", cacheUserList);
      }
    });
  }

  private loadReadData(): void {
    this.refreshing = true;
    this.pageNumber = this.pageNumber + 1;
    this.pageSize = 10;
    this.getReadedAirBusMessage();
  }

  async activeChat(userId) {
    this.activeUserId = userId;
    this.pageSize = 10;
    this.pageNumber = 1;
    this.messageList = [];
    this.beforeTime = new Date().getTime();
    this.getReadedAirBusMessage(true);
  }

  //拉取已读消息需要分页
  getReadedAirBusMessage(needRead: boolean = false) {
    CabinLayoutService.getAirBusMessage({
      userId: this.activeUserId,
      beforeTime: this.beforeTime,
      take: this.pageSize,
      skip: (this.pageNumber - 1) * this.pageSize,
    }).then((resData: any) => {
      if (resData.code == "200") {
        if (needRead) {
          this.readAirBusMessage(this.activeUserId);
        }

        resData.data = resData.data.reverse();
        this.messageList = resData.data.concat(this.messageList);
        this.scrollToTop();
        this.loading = false;
        this.refreshing = false;
      } else {
        this.$toast("获取列表失败!");
        this.loading = false;
        this.refreshing = false;
      }
    });
  }

  private beforeDestroy() {
    (this as any).$globalEvent.$off("new_msg", this.msgListener);
  }

  private sendMessage() {
    CabinLayoutService.sendToUser({
      to: this.activeUserId,
      content: this.inputMessage,
    }).then((resData: any) => {
      if (resData.code == "200") {
        this.inputMessage = "";
        this.messageList.push(resData.data);
        this.scrollToBottom();
      }
    });
  }

  private startWebScoket() {
    this.msgListener = (newMessageObj) => {
      console.log("收到消息：chat");
      //肥系统消息
      if (newMessageObj.type == "message") {
        if (newMessageObj.from_user_id == this.activeUserId) {
          this.messageList.push(newMessageObj);
          this.scrollToBottom();
          this.readAirBusMessage(newMessageObj.from_user_id);
          //调用消息已读取接口
        } else {
          this.newMsgCount[newMessageObj.from_user_id] =
            (this.newMsgCount[newMessageObj.from_user_id] || 0) + 1;
          this.$forceUpdate();
        }

        //更新左侧消息的内容和事件,如果消息不在列表增到列表,如果在信息列表,如果不在前5条则把记录移动到顶部
        let cacheUserList = localStore.get("cacheUserList");
        let userId =
          newMessageObj.sendType == 1
            ? newMessageObj.from_user_id
            : newMessageObj.to_user_id;
        let NickName =
          newMessageObj.sendType == 1
            ? newMessageObj.fromNickName
            : newMessageObj.toNickName;
        let retIndex = cacheUserList.indexOf(userId);

        if (retIndex < 0) {
          cacheUserList.unshift(userId);
          this.messageUserList.unshift({
            Id: userId,
            NickName: NickName,
            SeatNumber: newMessageObj.seatNumber,
            created_time: newMessageObj.created_time,
            content: newMessageObj.content,
          });
        } else if (retIndex >= 1) {
          cacheUserList.splice(retIndex, 1);
          cacheUserList.unshift(userId);
          this.messageUserList.splice(retIndex, 1);
          this.messageUserList.unshift({
            Id: userId,
            NickName: NickName,
            SeatNumber: newMessageObj.seatNumber,
            created_time: newMessageObj.created_time,
            content: newMessageObj.content,
          });
        } else {
          this.messageUserList[retIndex].created_time =
            newMessageObj.created_time;
          this.messageUserList[retIndex].content = newMessageObj.content;
        }
        this.$forceUpdate();
        localStore.set("cacheUserList", cacheUserList);
        /*airbus_id: "4CFC4D33-2C1E-E911-BAD5-F44D307124C0"
						content: "哈哈"
						created_time: "2020-09-06 14:02:57"
						fromNickName: "mizao"
						from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7"
						id: "1bd93b2435219ed8a3681381881d1517"
						read: 0
						seatNumber: "6B"
						sendType: 1
						toNickName: null
						to_user_id: "4CFC4D33-2C1E-E911-BAD5-F44D307124C0"
						type: "message"*/
      }

      console.log("chat:msg");
    };
    (this as any).$globalEvent.$on("new_msg", this.msgListener);
  }

  private scrollToBottom() {
    this.$nextTick(() => {
      (this.$refs.messageCtn as any).scrollTop = (this.$refs
        .messageCtn as any).scrollHeight;
    });
  }

  private scrollToTop() {
    this.$nextTick(() => {
      (this.$refs.messageCtn as any).scrollTop = 0;
    });
  }

  readAirBusMessage(userId, callback?) {
    CabinLayoutService.readAirBusMessage({
      userId: userId,
    }).then((resData: any) => {
      if (resData.code == "200") {
        this.newMsgCount[userId] = 0;
        this.$forceUpdate();
        callback && callback();
      }
    });
  }

  //获取未读消息与座位的映射关系
  public getSeatMessageInfo(): void {
    CabinLayoutService.getSeatMessageInfo().then((resData: any) => {
      let seatMessageMap: any = {};

      if (resData.code == "200") {
        this.userList = resData.data;
      }
    });
  }

  private stepToLayout(): void {
    this.$emit("close");
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  //$px为需要转换的字号
  @return $px / 100px * 1rem; //100px为根字体大小
}

.crew-chat {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1200;
  box-sizing: border-box;
  margin-bottom: 1.2rem;
  background: #002566;
  .top-ctn {
    position: relative;
    padding: rem(60px) rem(60px) 0;
    display: flex;
    align-items: center;
    z-index: 120;
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
    .content-ctt {
      position: relative;
      width: 100%;
      height: 100%;
      .aside-ctn {
        position: absolute;
        height: 100%;
        width: rem(520px);
        overflow: auto;
        background: red;
        box-sizing: border-box;
        background: linear-gradient(
          180deg,
          rgba(0, 38, 106, 1) 0%,
          rgba(0, 66, 133, 1) 100%
        );

        .delete-btn {
          width: rem(178px);
          height: rem(178px);
          text-align: center;
          line-height: rem(178px);
          background: rgba(228, 0, 43, 1);
          > .icon {
            color: #ffffff;
            font-size: rem(32px);
            line-height: rem(112px);
          }
        }

        .user-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: rem(2px) solid rgba(255, 255, 255, 0.08);
          height: rem(176px);
          padding: 0 rem(30px);
          &.active {
            background: #0242a2;
          }

          .message-count {
            display: inline-block;
            position: absolute;
            top: 0.2rem;
            left: 0.3rem;
            width: 0.4rem;
            height: 0.4rem;
            text-align: center;
            line-height: 0.4rem;
            font-size: 0.26rem;
            font-weight: 400;
            color: white;
            background: #fe5000;
            border-radius: 50%;
          }
          .heade-img {
            border-radius: 50%;
            width: rem(96px);
            height: rem(96px);
            line-height: rem(96px);
            white-space: nowrap;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #ffffff;
            background: #83abd9;
          }
          .info-ctn {
            width: rem(340px);
            .info-top-ctn {
              display: flex;
              justify-content: space-between;
              margin-bottom: rem(10px);
              > span {
                font-size: rem(26px);
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(175, 213, 253, 1);
                line-height: rem(26px);
              }
            }
            .info-bottom-ctm {
              white-space: nowrap;
              font-size: rem(36px);
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: rem(36px);
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .main-ctn {
        margin-left: rem(520px);
        position: relative;
        height: 100%;
        &:after {
          height: 1;
          width: 100%;
          content: "";
          clear: both;
        }
        .message-ctn {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background: green;
          box-sizing: border-box;
          overflow: auto;
          background: rgba(0, 44, 111, 1);
          .inner-ctn {
            min-height: 100%;
            box-sizing: border-box;
            position: relative;
            padding: rem(80px);
          }
          .message-item-ctn {
            overflow: hidden;
            &::after {
              content: "";
              width: 100%;
              clear: both;
            }
            .message-item {
              clear: both;
              &.left {
                float: left;
              }
              &.right {
                float: right;
              }
              position: relative;
              min-width: rem(332px);
              max-width: 90%;
              min-height: rem(124px);
              margin-bottom: rem(40px);
              border-radius: rem(60px);
              box-sizing: border-box;
              border: rem(4px) solid rgba(175, 213, 253, 1);

              .heade-img {
                position: absolute;
                top: rem(10px);
                left: rem(10px);
                border-radius: 50%;
                width: rem(96px);
                height: rem(96px);
                line-height: rem(96px);
                white-space: nowrap;
                text-align: center;
                overflow: hidden;
                color: #ffffff;
                text-overflow: ellipsis;
                background: #83abd9;
              }
              .info-ctn {
                margin-left: rem(140px);
                margin-right: rem(20px);
                margin-bottom: rem(20px);

                .info-top-ctn {
                  display: flex;
                  justify-content: space-between;
                  margin-top: rem(20px);
                  margin-bottom: rem(10px);
                  > span {
                    font-size: rem(26px);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(175, 213, 253, 1);
                    line-height: rem(26px);
                  }
                }
                .info-bottom-ctm {
                  font-size: rem(36px);
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
                  line-height: rem(40px);
                }
              }
            }
          }
        }
        .oper-ctn {
          display: flex;
          padding: 0 rem(40px);
          align-items: center;
          justify-content: space-between;
          position: absolute;
          bottom: 0;
          height: rem(120px);
          z-index: 100;
          width: 100%;
          box-sizing: border-box;
          background: rgba(0, 44, 111, 1);
          .input-ctn {
            width: rem(1400px);
            height: rem(68px);
            background: rgba(49, 102, 171, 0.3);
            border-radius: rem(34px);
            overflow-y: auto;
            overflow-x: hidden;
            > textarea {
              width: 100%;
              height: 100%;
              background: transparent;
              line-height: rem(68px);
              border: none;
              padding: rem(16px) rem(30px);
              font-size: rem(36px);
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: rem(36px);
            }
          }
          .submit-ctn {
            width: rem(200px);
            height: rem(68px);
            border-radius: rem(34px);
            background: #2a5ea3;
            text-align: center;
            color: #ffffff;
            line-height: rem(68px);
            // font-weight: bold;
            font-size: rem(40px);
          }
        }
      }
    }
  }
}
</style>