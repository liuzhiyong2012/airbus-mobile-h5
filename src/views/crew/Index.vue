<template>
  <section class="crew-layout-ctn">
    <section class="header-ctn">
      <crew-tab
        :tabList="tabList"
        :active="active"
        @switchPage="switchPage"
      ></crew-tab>
    </section>
    <section class="body-ctn">
      <router-view  v-if="isRouterAlive" class="crew-route-view-ctn" />
    </section>
    <section class="footer-ctn">
      <crew-footer
        :flightResData="flightResData"
        @showSetWindow="showSetting"
      ></crew-footer>
    </section>

    <!--<van-button type="primary" class="message-btn" text="组件调用" @click="showNotify" />-->
    <van-notify v-model="show" class="message-ctn">
      <div class="notify-ctn">
        <div class="notify-head">
          <!--<i class="icon"></i>-->
          <span class="tip"> {{ $t("newMessage") }} </span>
        </div>
        <div class="notify-content">
          <div class="head-img">
            {{ messageContent.userName }}
          </div>

          <!--<div class="head-img" v-if="messageContent.itemType!='netFlow'" :style="{backgroundImage:`url(${messageContent.itemImgUrl})`}">
					</div>-->
          <div class="content-ctn">
            <div class="seat-ctn">
              {{ messageContent.seatNumber }} 
			
				 
				
				  <span  class="read-btn" @click="goto(messageContent)">{{$t("readBtn")}}</span>
             <!-- <van-button type="info" class="vant-btn" @click="goto(messageContent)">go</van-button> -->
			 
            </div>
            <div class="msg-ctn">{{ messageContent.content }}</div>
          </div>
        </div>
      </div>
      <div class="close-ctn" @click="clickClose">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close" />
        </svg>
      </div>
    </van-notify>
    <div class="listen">
      <audio id="audio" ref="audio" controls autoplay hidden>
        <source src="./audio/ding.mp3" >
      </audio>
    </div>
    
    <div :class="[isShowSetting ? 'set-proup active' : 'set-proup']">
      <div class="set-box">
        <div class="set-title">{{ $t("Setting") }}</div>
        <div class="set-flex">
          <div class="fl">{{ $t("demo") }}</div>
          <div class="f1 set-center">
            <van-switch
              :active-value="'1'"
              :inactive-value="'0'"
              v-model="runDemo"
              active-color="#00AEC7"
              inactive-color="#AFD5FD"
            />
          </div>
        </div>
        <div class="set-flex">
          <div class="fl">{{ $t("CloudAddress") }}</div>
          <div class="f1">
            <input
              v-model="cloudLink"
              class="address-inp"
              type="text"
              :placeholder="$t('CloudAddressText')"
            />
          </div>
        </div>
        <div class="set-flex">
          <div class="fl">{{ $t("Language") }}</div>
          <div class="f1">
            <div class="set-sel" @click="changeLanguage">{{ language }}</div>
            <svg class="icon icon-set-sel" aria-hidden="true">
              <use xlink:href="#icon-select_3" />
            </svg>
            <div :class="[isLanguageShow ? 'sel-proup active' : 'sel-proup']">
              <div class="text" @click="changeToEnglish">English</div>
              <div class="text" @click="changeToCn">简体中文</div>
            </div>
          </div>
        </div>
        <div class="set-flex set-other">
			<van-button class="set-text-reset" loading-type="spinner" :loading="databaReseting" :loading-text="$t('resetDbing')" type="danger"  @click="clickReset">{{ $t("ResetDatabase") }}</van-button><br />
			
		  <!-- <span class="set-text-reset" @click="clickReset">{{ $t("ResetDatabase") }}</span> -->
          <span class="set-text1" @click="clickCancel">{{ $t("Cancel") }}</span>
          <span class="set-text1" @click="clickSubmit">{{ $t("Submit") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
<i18n>
	{
		"zh":{
			"readBtn":"前往",
			"newMessage": "你收到一条信息",
			"Cancel":"取消",
			"Submit":"提交",
			"ResetDatabase":"重置数据库",
			"Language":"语言",
			"CloudAddress":"云端地址",
			"demo":"演示",
			"Setting":"设置",
			"CloudAddressText":"请输入云端地址",
            "toast1":"飞机航班已经切换!",
            "toast2":"提交配置成功",
            "toast3":"提交配置失败",
            "toast4":"获取配置失败",
			"resetDbSuccessTip":"重置数据库成功",
			"resetDbFailTip":"重置数据库失败",
			"resetDbing":"重置中，请稍后"
		},
		"en":{
			"readBtn":"go",
			"newMessage": "You got a new message",
			"Cancel":"Cancel",
			"Submit":"Submit",
			"ResetDatabase":"Reset Database",
			"Language":"Language",
			"CloudAddress":"Cloud address",
			"demo":"demo",
			"Setting":"Setting",
			"resetDbing":"Resetting...",
			"CloudAddressText":"Please enter cloud address",
            "toast1":"Flight has been switched!",
            "toast2":"Configuration submitted successfully",
            "toast3":"Failed to submit configuration",
            "toast4":"Failed to get configuration",
			"resetDbSuccessTip":"Database was reset successfully",
			"resetDbFailTip":"Database was failed to reset"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CrewTab from './components/CrewTab.vue';
import CrewFooter from './components/CrewFooter.vue';
import FlightService from '../../service/flight';

import SettingService from '../../service/crew/setting';

import { localStore } from '@/utils/data-management';
declare let io: any;

@Component({
  name: 'CrewLayoutCtn',
  components: {
    CrewTab,
    CrewFooter,
  },
})
export default class CrewLayoutCtn extends Vue {
  
  private tabList: Array<any> = [
    {
      name: 'Catering',
      value: 'catering',
      routeName: 'crewCatering',
    },
    {
      name: 'Data package',
      value: 'dataPackage',
      routeName: 'crewDataPackage',
    },
    {
      name: 'Goods',
      value: 'goods',
      routeName: 'crewGoods',
    },
    {
      name: 'Income statistics',
      value: 'incomeStatistics',
      routeName: 'crewIncomeStatistics',
    },
    {
      name: 'Cabin layout',
      value: 'cabinLayout',
      routeName: 'crewCabinLayout',
    },
  ];

  private active: string = 'catering';
  private socket: any = null;

  private runDemo: boolean = true;
  private cloudLink: string = '';

  private unloadHandler: any = null;

  private language: string = 'English';
  private locale: string = '';
  private isLanguageShow: boolean = false;
  private show: boolean = false;
  private isShowSetting: boolean = false;
  private isRouterAlive: boolean = true;
  
  private databaReseting: boolean = false;

  private timer: any = null;
  private sound: any;

  public flightResData: any = {};

  private messageContent: any = {
    seatNumber: '--',
    userName: '',
    itemImgUrl: '--',
    content: '',
  };
  
  public created() {
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
	  this.locale = 'en';
      this.language = 'English';
    } else {
	  this.locale = 'zh';
      this.$i18n.locale = 'zh';
      this.language = '简体中文';
    }


    SettingService.getSetting().then((res: any) => {
      if (res.code == '200') {
        this.runDemo = res.data.RunDemo;
        this.cloudLink = res.data.CloudLink;
      } else {
        this.$toast(this.$i18n.t('toast4'));
      }
    });
  }
  private mounted() {
    let THIS = this;
    this.unloadHandler = (e) => {
      THIS.socket && THIS.socket.close && THIS.socket.close();
      THIS.socket && THIS.socket.destroy && THIS.socket.destroy();
      THIS.socket = null;
    };
    window.addEventListener('beforeunload', this.unloadHandler);
    this.getFlightInfo();
    this.startTimer();
  }

  private reload() {
	this.isRouterAlive = false; //先关闭，
    this.$nextTick(function () {
      this.isRouterAlive = true; //再打开
    });
  }
  
  private showSetting() {
    this.isShowSetting = true;
  }
  private beforeDestroy() {
    window.clearInterval(this.timer);
    window.removeEventListener('beforeunload', this.unloadHandler);
    this.socket && this.socket.close && this.socket.close();
    this.socket && this.socket.destroy && this.socket.destroy();
    this.socket = null;
  }
  private changeToEnglish() {
    this.language = 'English';
    this.isLanguageShow = false;
  }
  private changeToCn() {
    this.language = '简体中文';
    this.isLanguageShow = false;
  }
  private clickSubmit() {
	 if(this.databaReseting){
		 return;
	 }
    if (this.language == 'English') {
      localStorage.setItem('lang', 'en');
	  this.$i18n.locale = 'en';
    } else {
      localStorage.setItem('lang', 'zh');
	  this.$i18n.locale = 'zh';
    }
	
    SettingService.setSetting({
      CloudLink: this.cloudLink,
      RunDemo: this.runDemo,
    }).then((res: any) => {
      if (res.code == '200') {
        this.$toast(this.$i18n.t('toast2'));
        this.isShowSetting = false;
        this.$router.go(0);
      } else {
        this.$toast(this.$i18n.t('toast3'));
      }
    });
	
  }
  private clickCancel() {
	  if(this.databaReseting){
	  		 return;
	  }
    this.isShowSetting = false;
  }
  
  private clickReset() {
	this.databaReseting = true;
    SettingService.resetDataBase({}).then((res: any) => {
	
      if (res.code == '200') {
       this.$toast(this.$i18n.t('resetDbSuccessTip'));
			 this.isShowSetting = false;
			 this.reload();
      } else {
		   this.$toast(this.$i18n.t('resetDbFailTip'));
      }
	  this.databaReseting = false;
    }).catch(()=>{
		this.databaReseting = false;
		 this.$toast(this.$i18n.t('resetDbFailTip'));
	});
  }
  
  
  
  private getFlightInfo() {
    FlightService.getFlightInfo().then((res: any) => {
      if (res.code == 200) {
        this.flightResData = res.data;
        this.$store.commit(
          'setAirbusId',
          this.flightResData.Flight.BaseInfo.Id
        );

        this.startWebScoket(this.flightResData.Flight.BaseInfo.Id);
      }
    });
  }

  private startTimer() {
    let timePeriod = 5000;

    this.timer = window.setInterval(() => {
      FlightService.getFlightInfo().then((res: any) => {
        if (res.code == 200) {
          //如果飞机航班改变了，则跳转登录页面，并且重新开始实时推送。
          if (
            this.flightResData.Flight.BaseInfo.Id == res.data.Flight.BaseInfo.Id
          ) {
            this.flightResData = res.data;
          } else {
            this.$toast(this.$i18n.t('toast1'));
            this.socket && this.socket.close && this.socket.close();
            this.socket && this.socket.destroy && this.socket.destroy();
            this.socket = null;
            this.flightResData = res.data;
            this.$store.commit(
              'setAirbusId',
              this.flightResData.Flight.BaseInfo.Id
            );
            this.startWebScoket(this.flightResData.Flight.BaseInfo.Id);
            if (this.$route.path.indexOf('/cater') < 0) {
              this.$router.push({
                path: '/cater',
              });
            }
          }
        }
      });
    }, timePeriod);
  }
  private changeLanguage() {
    this.isLanguageShow = true;
  }
  private startWebScoket(airbusId) {
    var _this = this;
    const opt = {
      forceNew: true,
      path: process.env.VUE_APP_SOCKET_URL,
    };
    this.socket = io(process.env.VUE_APP_SOCKET_HOST, opt);
    // socket连接后以uid登录
    this.socket.on('connect', () => {
		console.log('crew:connect');
      this.socket.emit('login', airbusId);
    });

    // 后端推送来消息时
    this.socket.on('new_msg', (msg) => {
      console.log('crew:new_msg');
      let midMsg = msg.replace(/&quot;/g, '"');
      let newMessageObj = JSON.parse(midMsg);
      (this as any).$globalEvent.$emit('new_msg', newMessageObj);

      if (newMessageObj.type == 'crew') {
					 
        this.messageContent.seatNumber = newMessageObj.seatNumber;
        this.messageContent.itemType = newMessageObj.itemType;
        this.messageContent.userName = newMessageObj.user.NickName;
		
		
		 if( this.$i18n.locale == 'zh'){
			 this.messageContent.content = newMessageObj.notice.Mark;
		 }else{
			 this.messageContent.content = newMessageObj.notice.Title;
		 }
        
        this.showNotify();
        this.reload();
      }
    });
  }

  public switchPage(value): void {
    this.active = value;
    let routeMap = {
      catering: 'crewCatering',
      dataPackage: 'crewDataPackage',
      goods: 'crewGoods',
      incomeStatistics: 'crewIncomeStatistics',
      cabinLayout: 'crewCabinLayout',
    };

    if (routeMap[value]) {
      this.$router.push({
        name: routeMap[value],
      });
    }
  }

  public clickClose(){
    this.show = false;
  }

  public showNotify() {
    this.sound = document.getElementById('audio');
    this.sound.play();

    // _this.sound = new Audio();
    // _this.sound.src = './audio/ding.mp3';
    // _this.sound.play();
    
    // this.$refs.audio.currentTime = 0; //从头开始播放提示音
    // this.$refs.audio.play(); //播放
    // this.$router.go(0);
    // debugger
	
    let time = 50000;
    if (this.show) {
      this.show = false;
      setTimeout(() => {
        this.show = true;
        setTimeout(() => {
          //this.show = false;
        }, time);
      }, 1000);
    } else {
      this.show = true;
      setTimeout(() => {
        //this.show = false;
      }, time);
    }
  }

  public goto(item){
    this.show = false;
    if(item.itemType=='dish'){
      this.$router.push({
        name:'crewCatering',
        query:{

        }
      });
    }else if(item.itemType=='netFlow'){
      this.$router.push({
        name:'crewDataPackage',
        query:{

        }
      });
    }else if(item.itemType=='shopping'){
      this.$router.push({
        name:'crewGoods',
        query:{

        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/index.scss";
@function rem($px) {
  //$px为需要转换的字号
  @return $px / 100px * 1rem; //100px为根字体大小
}

.message-btn {
  position: relative;
  z-index: 10000;
}
.van-list__finished-text {
  font-size: 0.28rem !important;
}
.v-finished-text {
  width: 100% !important;
  font-size: 0.24rem !important;
  text-align: center;
  line-height: 1rem;
}

.message-ctn {
  position: absolute;
  right: 40px;
  bottom: 240px;
  top: auto;
  left: auto;
  width: 4.8rem;
  // height: 1.82rem;
  border-radius: 0.3rem;
  border: 0.04rem solid #afd5fd;
  z-index: 1000;
  background: #003e81;
  .notify-ctn {
    position: relative;
    padding: rem(16px) rem(30px) rem(20px);
    .notify-head {
      .tip {
        font-size: rem(32px);
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #afd5fd;
        line-height: rem(32px);
      }
      margin-bottom: rem(20px);
    }
    .notify-content {
      position: relative;
      .head-img {
        position: absolute;
        border-radius: 50%;
        width: rem(84px);
        height: rem(84px);
        line-height: rem(84px);
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        color: #ffffff;
        background: #83abd9;
        font-size: rem(18px);
      }
      .content-ctn {
		  position: relative;
        margin-left: rem(108px);
        .seat-ctn {
          width: rem(68px);
          height: rem(43px);
          background: #00aec7;
          border-radius: rem(6px);
          text-align: center;
          line-height: rem(43px);
          font-size: rem(22px);
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: rem(12px);
          display: flex;
          align-items: center;
		  
		  .read-btn{
		  					     position: absolute;
		  					     top: 0.06rem;
		  					     right: 0;
		  					     width: 0.56rem;
		  					     height: 0.30rem;
		  					     box-shadow: 0 0.13rem 0.14rem 0 rgba(0, 0, 0, 0.13);
		  					     border-radius: 0.06rem;
		  					     border: 0.01rem solid #afd5fd;
		  					     text-align: center;
		  					     line-height: 0.26rem;
		  					     font-size: 0.2rem;
		  					     color: #afd5fd;
		  }
          .vant-btn{
            margin-left: 1.7rem;
            font-size: rem(22px);
          }
        }
        .msg-ctn {
          text-align: left;
          font-size: rem(24px);
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: rem(30px);
        }
      }
    }
  }
  .close-ctn{
    position:absolute;
    right: .5em;
    top: .5em;
    padding: .1em;
    border-radius: 50%;
    background-color: rgba(255,255,255,.4);
  }
}

.crew-layout-ctn {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: #002468;
  .header-ctn {
  }
  .body-ctn {
    position: absolute;
    top: rem(182px);
    bottom: rem(120px);
    width: 100%;
    .crew-route-view-ctn {
    }
  }
  .footer-ctn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .set-proup {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 11999;
    display: none;
    .set-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 7rem;
      //   height: 4.5rem;
      background-color: rgba(0, 24, 94, 1);
      border-radius: 0.3rem;
      padding: 0 0 0.3rem 0;
      border: 0.04rem solid #afd5fd;
      color: #afd5fd;
      .set-title {
        padding: 0 0 0 0.5rem;
        width: 100%;
        font-size: 0.35rem;
        line-height: 1rem;
        box-sizing: border-box;
      }

      .set-flex {
        display: flex;
        justify-content: center;
        align-items: center;
        .fl {
          width: 2.5rem;
          text-align: right;
          font-size: 0.3rem;
          margin: 0 0.3rem 0 0;
        }
        .f1 {
          position: relative;
          flex: 1;
          .address-inp {
            width: 3.6rem;
            margin: 0.1rem 0;
            border: none;
            height: 0.6rem;
            border-radius: 0.1rem;
            background-color: #022464;
            padding: 0 0 0 0.2rem;
            line-height: 0.6rem;
          }
          .set-sel {
            width: 3.6rem;
            margin: 0.1rem 0;
            height: 0.6rem;
            border-radius: 0.1rem;
            background-color: #022464;
            padding: 0 0 0 0.2rem;
            line-height: 0.6rem;
          }
          .icon-set-sel {
            position: absolute;
            width: 0.3rem;
            height: 0.3rem;
            right: 0.6rem;
            top: 0.25rem;
          }
          .sel-proup {
            position: absolute;
            left: 0rem;
            top: 0.7rem;
            width: 3rem;
            display: none;
            .text {
              width: 3.6rem;
              padding: 0 0 0 0.2rem;
              height: 0.6rem;
              line-height: 0.6rem;
              background-color: #00aec7;
            }
            .text:hover {
              background-color: #0098c7;
            }
          }
          .active {
            display: block;
          }
        }
        .set-center {
          padding: 0.2rem;
        }
        .set-text1 {
          padding: 0.2rem;
          margin: 0.2rem 0.6rem 0 0;
        }
		.set-text-reset{
			float: left;
			    padding: 0.2rem;
			    margin: 0.2rem auto 0 0.50rem;
			    border: 1px solid #ffffff;
			    border-radius: 0.04rem;
			    color: #ffffff;
			    background: #e40a0a;
				
				/deep/  .van-button__text{
					font-size: 0.24rem;
				}
		}
      }
      .set-other {
        justify-content: flex-end;
      }
    }
  }
  .active {
    display: block;
  }
}
</style>