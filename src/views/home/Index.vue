<template>
  <div class="home-ctn">
    <van-sticky :offset-top="0">
      <div class="home-title">
        <home-title @stepTo="stepToPage($event)" :showRed="showRedPoint"></home-title>
      </div>
    </van-sticky>
    <van-popup v-model="show">
      <div class="popup-toast">
        <div class="title">Connet To The Internet</div>
        <div class="surplus">
          <span class="now">Now</span>0 GB
        </div>
        <div class="cell-group">
          <div class="cell">
            <div class="cell-l">12323123</div>
            <div class="cell-r">$12332</div>
          </div>
          <div class="cell">
            <div class="cell-l">12323123</div>
            <div class="cell-r">$12332</div>
          </div>
          <div class="cell">
            <div class="cell-l">12323123</div>
            <div class="cell-r">$12332</div>
          </div>
          <div class="cell">
            <div class="cell-l vip">Vip</div>
            <div class="cell-r buy">Buy</div>
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showService">
      <div class="popup-toast">
        <div class="title service">
          Terms of Service
          <br />& Privacy Policy
        </div>
        <div class="con">
          We have updated our
          <span class="txt">privacy policy</span>
          to comply with the latest laws and regulations. The updated policy
          explains the mechanism of how we collect and treat your personal data.
          <span class="txt" >tems of service</span>
          You can learn more about the rights you have by reading our .Please
          read them carefully.By clicking AGREE,you indicate that you have read
          and agreed to our privacy policies.
        </div>
        <div class="btn" @click="clickShowService">Agree</div>
        <div class="btn later" @click="clickShowService">later</div>
      </div>
    </van-popup>
    <van-tabs
      scrollspy
      sticky
      line-width="20"
      line-height="4"
      color="rgb(0,32,91)"
      title-active-color="rgb(0,32,91)"
    >
      <van-tab
        v-for="(item, index) in navTar"
        :title="$t(item.value)"
        title-active-color="#3056EF"
        :key="index"
      >
        <div v-if="item.title == 'Flight'" class="flight">
          <home-components :titleConfig="navTar[0]" @stepTo="stepToPage($event)">
            <home-flight></home-flight>
          </home-components>
        </div>
        <div v-else-if="item.title == 'Dish'">
          <home-components :titleConfig="navTar[1]" @stepTo="stepToPage($event)">
            <home-dish />
          </home-components>
        </div>
        <div v-else-if="item.title == 'Shopping'">
          <home-components :titleConfig="navTar[2]" @stepTo="stepToPage($event)">
            <home-shopping />
          </home-components>
        </div>
        <div v-else-if="item.title == 'Music'">
          <home-components :titleConfig="navTar[3]" @stepTo="stepToPage($event)">
            <home-music />
          </home-components>
        </div>
        <div v-else-if="item.title == 'Game'">
          <home-components :titleConfig="navTar[4]" @stepTo="stepToPage($event)">
            <home-game />
          </home-components>
        </div>
        <div v-else-if="item.title == 'Video'">
          <home-components :titleConfig="navTar[5]" @stepTo="stepToPage($event)">
            <home-video />
          </home-components>
        </div>
        <div v-else-if="item.title == 'News'">
          <home-components :titleConfig="navTar[6]" @stepTo="stepToPage($event)">
            <home-news />
          </home-components>
        </div>
        <div v-else-if="item.title == 'About Us'">
          <home-components :titleConfig="navTar[7]" @stepTo="stepToPage($event)">
            <home-about-us />
          </home-components>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<i18n>
	{
		"zh":{
			"flight":"航班",
			"dish":"餐品",
			"shopping":"机上购物",
			"music":"音乐",
			"game":"游戏",
			"video":"视频",
			"news":"新闻",
			"aboutUs":"关于我们"
		},
		"en":{
			"flight":"Flight",
			"dish":"Dish",
			"shopping":"Shopping",
			"music":"Music",
			"game":"Game",
			"video":"Video",
			"news":"News",
			"aboutUs":"About Us"
		}
	}
</i18n>

<script lang="ts">
// @ is an alias to /src
import { Component, Prop, Vue } from 'vue-property-decorator';
import HomeTitle from './components/HomeTitle.vue';
import HomeComponents from './components/HomeComponents.vue';
import HomeFlight from './components/HomeFlight.vue';
import HomeDish from './components/HomeDish.vue';
import HomeShopping from './components/HomeShopping.vue';
import HomeMusic from './components/HomeMusic.vue';
import HomeGame from './components/HomeGame.vue';
import HomeVideo from './components/HomeVideo.vue';
import HomeNews from './components/HomeNews.vue';
import HomeAboutUs from './components/HomeAboutUs.vue';
import { localStore } from '../../utils/data-management';
import MessageService from '../../service/message';
declare function require(type: string): string;
declare let io: any;
// import { getApprovalDetail } from "@/service/center";
@Component({
  name: 'Home',
  components: {
    HomeTitle,
    HomeFlight,
    HomeDish,
    HomeShopping,
    HomeMusic,
    HomeGame,
    HomeVideo,
    HomeNews,
    HomeAboutUs,
    HomeComponents,
  },
})
export default class Home extends Vue {
  private show: boolean = false;
  private showService: boolean = false;
  private navTar: Array<any> = [];
  private imagesData: Array<any> = [];

  private showRedPoint: boolean = false;
  private uInfo: any = {};
  private socket: any = null;
  private unloadHandler: any = null;

  private created() {
    clearTimeout();
    if (!localStore.get('homeAd')) {
      localStore.set('homeAd', true);
      this.showService = true;
    } 

    this.navTar = [
      {
        title: 'Flight',
        value: 'flight',
      },
      {
        title: 'Dish',
        value: 'dish',
      },
      {
        title: 'Shopping',
        value: 'shopping',
      },
      {
        title: 'Music',
        value: 'music',
      },
      {
        title: 'Game',
        value: 'game',
      },
      {
        title: 'Video',
        value: 'video',
      },
      {
        title: 'News',
        value: 'news',
      },
      {
        title: 'About Us',
        value: 'aboutUs',
      },
    ];
    this.imagesData = [
      {
        img: require('./images/game.jpg'),
        name: 'name0',
        details: 'details',
      },
      {
        img: require('./images/game.jpg'),
        name: 'name',
        details: 'details',
      },
      {
        img: require('./images/game.jpg'),
        name: 'name',
        details: 'details',
      },
    ];

    this.uInfo = localStore.get('userInfo');
  }

  private mounted() {
    let THIS = this;
  	this.unloadHandler = (e)=>{
  		THIS.socket&&THIS.socket.close&&THIS.socket.close();
      THIS.socket&&THIS.socket.destroy&&THIS.socket.destroy();
      THIS.socket = null;
		  //e = window.event||e;
		  //e.returnValue=('确定离开当前网站吗?');
    };
    window.addEventListener('beforeunload', this.unloadHandler);
    
    this.initWebSocket();
    
    this.getChatUnread({ read: 0 });
    this.getNoticeUnread({ read: 0 });
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
  }
  private beforeDestroy() {
    window.removeEventListener('beforeunload', this.unloadHandler);
    this.socket.close&&this.socket.close();
    this.socket.destroy&&this.socket.destroy();
    this.socket = null;
  }

  public clickShowService(){
    this.showService = turn;
  }
  public stepToPage(pageType: any) {
    let routeMap: any = {
      flight: 'flightIndex',
      dish: 'dishIndex',
      shopping: 'shopping',
      music: 'musicIndex',
      game: 'game',
      video: 'video',
      news: 'news',
      me: 'meIndex',
      message: 'messageIndex',
      internet: 'internet',
      internetCart: 'internetCart',
      scan: 'scan',
      aboutUs: 'aboutUs'
    };
    this.$router.push({
      name: routeMap[pageType],
    });
  }

  // 初始化websocket
  public initWebSocket() {
    const _this = this;
    // 连接服务端，workerman.net:2120换成实际部署web-msg-sender服务的域名或者ip
    // _this.socket =  (window as any).io("http://172.16.8.69:2120");
    // _this.socket =  (window as any).io("http://kf.vpclub.cn/airbus/websocket");
    const opt = {
      forceNew: true,
      path: process.env.VUE_APP_SOCKET_URL
    };
    _this.socket = io( process.env.VUE_APP_SOCKET_HOST, opt);
    // uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
    let uid = _this.uInfo.id.trim();
    
    // socket连接后以uid登录
    _this.socket.on('connect', function () {
    	console.log('首页:connect');
      _this.socket.emit('login', uid);
    });
    // 后端推送来消息时
    _this.socket.on('new_msg', (msg: any) => {
    	console.log('首页:new_msg', msg);
      let midMsg = msg.replace(/&quot;/g, '"');
      let endMsg = JSON.parse(midMsg);
      console.log('首页:new_msg格式化', endMsg);
      
      if (endMsg.type == 'system') {
        // 系统通知
        _this.showRedPoint = true;
        // console.log("推送-系统通知", _this.showRedPoint);
      } else if (endMsg.type == 'message') {
        // 聊天
        _this.showRedPoint = true;
        // console.log("推送-聊天", _this.showRedPoint);
      }
    });
    // 后端推送来在线数据时
    _this.socket.on('update_online_count', (online_stat: any) => {
      console.log('首页:update_online_count', online_stat);
    });
  }

  public getChatUnread(req: any) {
    const _this = this;
    MessageService.getUserMessage(req).then((res) => {
      if (res.code == 200) {
        if (res.data.length != 0) {
          _this.showRedPoint = true;
          console.log('接口返回-聊天', _this.showRedPoint);
        }
      }
    });
  }

  public getNoticeUnread(req: any) {
    const _this = this;
    MessageService.getSystemNoticeList(req).then((res) => {
      if (res.code == 200) {
        if (res.data.notice.length != 0) {
          _this.showRedPoint = true;
          console.log('接口返回-系统通知', _this.showRedPoint);
        }
      }
    });
  }
}
</script>

<style scoped lang="scss">
	@import '../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.home-ctn {
		  padding: 0 0 0.5rem 0;
		  .van-tab--active {
		    font-weight: 600;
		  }
		  .van-popup {
		    background-color: rgba(255, 255, 255, 0);
		  }
		  .van-tab__text--ellipsis{
		    overflow: inherit !important;
		  }
		  .popup-toast {
		    padding: 0 0 0.01rem;
		    width: 5.42rem;
		    background-color: #fff;
		    border-radius: 0.12rem;
		    .title {
		      width: 100%;
		      height: 1.2rem;
		      background-color: #00205b;
		      text-align: center;
		      font-size: 0.36rem;
		      font-weight: bold;
		      color: rgba(255, 255, 255, 1);
		      line-height: 1.2rem;
		      border-radius: 0.12rem 0.12rem 0 0;
		    }
		    .service {
		      padding: 0.3rem 0;
		      height: auto;
		      line-height: 0.42rem;
		    }
		    .con {
		      padding: 0.3rem;
		      background-color: #fff;
		      font-size: 0.28rem;
		      color: rgba(51, 51, 51, 1);
		      line-height: 0.42rem;
		      word-break: normal;
		      word-wrap: break-word;
		      .txt {
		        color: #00205b;
		        text-decoration: underline;
		        font-weight: bold;
		      }
		    }
		    .btn {
		      margin: 0 0.3rem;
		      background-color: #00205b;
		      font-size: 0.34rem;
		      font-weight: bold;
		      color: rgba(255, 255, 255, 1);
		      line-height: 0.74rem;
		      text-align: center;
		      border-radius: 0.37rem;
		    }
		    .later {
		      margin: 0.3rem 0;
		      padding: 0 0.3rem;
		      font-size: 0.26rem;
		      font-family: PingFangSC-Regular, PingFang SC;
		      font-weight: 400;
		      color: rgba(51, 51, 51, 1);
		      background-color: #fff;
		      line-height: 0.3rem;
		      height: 0.5rem;
		    }
		    .surplus {
		      padding: 0 0.3rem;
		      text-align: right;
		      background: #f2f4f7;
		      line-height: 0.7rem;
		      font-size: 0.28rem;
		      font-weight: bold;
		      color: rgba(0, 32, 91, 1);
		      .now {
		        margin: 0 0.2rem 0 0;
		        font-size: 0.28rem;
		        color: rgba(51, 51, 51, 1);
		        font-weight: 400;
		      }
		    }
		  }
		  
		  .cell-group {
		    padding: 0.3rem 0.3rem 0.01rem;
		    background-color: #fff;
		    border-radius: 0 0 0.12rem 0.12rem;
		    .cell {
		      margin: 0 0 0.3rem 0;
		      display: flex;
		      font-size: 0.3rem;
		      color: #2e2e2e;
		      line-height: 0.36rem;
		      .cell-r {
		        flex: 1;
		        text-align: right;
		        font-size: 0.32rem;
		        font-weight: bold;
		        color: rgba(0, 32, 91, 1);
		      }
		      .vip {
		        box-sizing: border-box;
		        width: 45%;
		        height: 0.66rem;
		        border: 0.03rem solid #00205b;
		        color: #00205b;
		        text-align: center;
		        line-height: 0.66rem;
		        border-radius: 0.33rem;
		        font-weight: bold;
		      }
		      .buy {
		        margin: 0 0 0 10%;
		        width: 45%;
		        height: 0.66rem;
		        background-color: #00205b;
		        color: #fff;
		        text-align: center;
		        line-height: 0.66rem;
		        border-radius: 0.33rem;
		        font-weight: bold;
		      }
		      .t-bold {
		        font-size: 0.35rem;
		        font-weight: bold;
		        color: rgba(46, 46, 46, 1);
		        line-height: 0.42rem;
		      }
		    }
		  }
		}
	}
	
	@media  (orientation:landscape) {
		.home-ctn {
		  padding: 0 0 0.5rem 0;
		  .van-tab--active {
		    font-weight: 600;
		  }
		  .van-popup {
		    background-color: rgba(255, 255, 255, 0);
		  }
		  .van-tab__text--ellipsis{
		    overflow: inherit !important;
		  }
		  .popup-toast {
		    // padding: 0 0 0.01rem;
		    width: 3.6rem;
			height: 4rem;
		    background-color: #fff;
		    border-radius: 0.12rem;
		    .title {
		      width: 100%;
		      height: 0.58rem;
		      background-color: #00205b;
		      text-align: center;
		      font-size: 0.18rem;
		      font-weight: bold;
		      color: rgba(255, 255, 255, 1);
		      line-height: 0.58rem;
		      border-radius: 0.12rem 0.12rem 0 0;
		    }
		    .service {
		      padding: 0.10rem 0;
		      height: auto;
		      line-height: 0.20rem;
		    }
		    .con {
		      padding: 0.3rem;
		      background-color: #fff;
		      font-size: 0.14rem;
		      color: rgba(51, 51, 51, 1);
		      line-height: 0.21rem;
		      word-break: normal;
		      word-wrap: break-word;
		      .txt {
		        color: #00205b;
		        text-decoration: underline;
		        font-weight: bold;
		      }
		    }
		    .btn {
		      margin: 0 0.3rem;
		      background-color: #00205b;
		      font-size: 0.17rem;
		      font-weight: bold;
		      color: rgba(255, 255, 255, 1);
		      line-height: 0.38rem;
		      text-align: center;
		      border-radius: 0.37rem;
			  width: 2.5rem;
			  margin: 0 auto;
		    }
		    .later {
		      padding: 0.18rem 0.3rem;
		      font-size: 0.17rem;
		      font-family: PingFangSC-Regular, PingFang SC;
		      font-weight: 400;
		      color: rgba(51, 51, 51, 1);
		      background-color: #fff;
		      line-height: 0.15rem;
			  width: 2.5rem;
			  margin: 0 auto;
		    }
		    .surplus {
		      padding: 0 0.3rem;
		      text-align: right;
		      background: #f2f4f7;
		      line-height: 0.7rem;
		      font-size: 0.28rem;
		      font-weight: bold;
		      color: rgba(0, 32, 91, 1);
		      .now {
		        margin: 0 0.2rem 0 0;
		        font-size: 0.28rem;
		        color: rgba(51, 51, 51, 1);
		        font-weight: 400;
		      }
		    }
		  }
		  
		  .cell-group {
		    padding: 0.3rem 0.3rem 0.01rem;
		    background-color: #fff;
		    border-radius: 0 0 0.12rem 0.12rem;
		    .cell {
		      margin: 0 0 0.3rem 0;
		      display: flex;
		      font-size: 0.3rem;
		      color: #2e2e2e;
		      line-height: 0.36rem;
		      .cell-r {
		        flex: 1;
		        text-align: right;
		        font-size: 0.32rem;
		        font-weight: bold;
		        color: rgba(0, 32, 91, 1);
		      }
		      .vip {
		        box-sizing: border-box;
		        width: 45%;
		        height: 0.66rem;
		        border: 0.03rem solid #00205b;
		        color: #00205b;
		        text-align: center;
		        line-height: 0.66rem;
		        border-radius: 0.33rem;
		        font-weight: bold;
		      }
		      .buy {
		        margin: 0 0 0 10%;
		        width: 45%;
		        height: 0.66rem;
		        background-color: #00205b;
		        color: #fff;
		        text-align: center;
		        line-height: 0.66rem;
		        border-radius: 0.33rem;
		        font-weight: bold;
		      }
		      .t-bold {
		        font-size: 0.35rem;
		        font-weight: bold;
		        color: rgba(46, 46, 46, 1);
		        line-height: 0.42rem;
		      }
		    }
		  }
		}
	}
	
	


</style>
