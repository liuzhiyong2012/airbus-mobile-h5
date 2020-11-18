<template>
  <div class="login">
    <ad-model v-if="isActive"></ad-model>
	<div class="login-bg"></div>
<div class="login-main-ctn">
	
	<div class="form">
	  <div class="user-details">
	    <div class="i-icon">
	      <svg class="icon" aria-hidden="true">
	        <use xlink:href="#icon-phone1" />
	      </svg>
	    </div>
	    <!-- @keyup="getUserPhone" -->
	    <!-- 限制11位 -->
	    <!-- <input
	      v-model="userPhone"
	      class="form-input padding1"
	      maxlength="20"
	      :placeholder="$t('placeholderPhone')"
	      type="number"
	      @keydown="getUserPhoneLength"
	    /> -->
	    <!-- 不限制位数 -->
	    <input
	      v-model="userPhone"
	      class="form-input padding1"
	      maxlength="20"
	      :placeholder="$t('placeholderPhone')"
	      type="number"
	    />
	    <div class="area-code" @click="clickShowAreaCode">+ {{ areaCode }}</div>
	    <div class="area-code-line"></div>
	    <van-popup
	      v-model="showAreaCode"
	      position="bottom"
	      :style="{ height: '36%' }"
	    >
	      <van-picker
	        show-toolbar
	        :columns="columns"
	        @cancel="showAreaCode = false"
	        @confirm="onConfirm"
	        :default-index="0"
	        :cancel-button-text="$t('Cancel')"
	        :confirm-button-text="$t('Determine')"
	      />
	    </van-popup>
	  </div>
	  <div class="user-details m40">
	    <div class="i-icon">
	      <svg class="icon" aria-hidden="true">
	        <use xlink:href="#icon-code1" />
	      </svg>
	    </div>
	    <input
	      v-model="userPassword"
	      class="form-input"
	      :placeholder="$t('placeholderPassword')"
	      type="password"
	    />
	  </div>
	</div>
	
	<div class="min-box">
	  <router-link to="/registery">
	    <div class="registery">{{ $t("Registery") }}</div>
	  </router-link>
	  <router-link to="/forgot/password">
	    <div class="forgot-password">{{ $t("ForgotPassword") }}?</div>
	  </router-link>
	</div>
	<div class="button-box">
	  <button @click="postUserLogin" class="button">{{ $t("Login") }}</button>
	</div>
	
	<div class="login-other">
	  <!-- <div class="f1">
	    <i class="icon icon-facebook_11 icon-text"></i>
	    <div class="login-other-name">facebook</div>
	  </div>
	  <div class="f1">
	    <i class="icon icon-line-diable icon-text"></i>
	    <div class="login-other-name">Line</div>
	  </div>
	  <div class="f1">
	    <i class="icon icon-wechat_11 icon-text"></i>
	    <div class="login-other-name">Wechat</div>
	  </div> -->
	</div>
	
</div>
	<div class="login-footer-ctn">
		<div class="line">
		  <div class="other"></div>
		</div>
		<div class="airbus-bg"></div>
	</div>
    
  </div>
</template>
<i18n>
	{
		"zh":{
			  "LOGIN": "登录",
        "Login": "登录",
        "Registery": "注册",
        "ForgotPassword": "忘记密码",
        "placeholderPhone": "你的手机号码",
        "placeholderPassword": "请输入密码",
        "noPassword": "密码不能为空",
        "showError":"手机号码有误，请重填",
        "Cancel":"取消",
        "Determine":"确定",
        "toast1": "手机号码不可以超出11位",
        "toast2": "服务端错误",
        "toast3": "网络异常！",
        "toast4": "用户名或密码不正确。"
		},
		"en":{
			  "LOGIN": "LOGIN",
        "Login": "Login",
        "Registery": "Sign up",
        "ForgotPassword": "Forgot Password",
        "placeholderPhone": "Your phone",
        "placeholderPassword": "Password",
        "noPassword": "Password cannot be empty",
        "showError":"Wrong mobile number, please fill in again",
        "Cancel":"Cancel",
        "Determine":"OK",
        "toast1": "Phone number cannot exceed 11 digits",
        "toast2": "Server error.",
        "toast3": "Network anomaly!",
        "toast4": "The user name or password is incorrect."
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AdModel from './components/ADModel.vue';
import LoginService from '../../service/login';
import { localStore } from '../../utils/data-management';
import {AreaCode} from '../../utils/area-code';
import ArrayUtils from '../../utils/array-utils';

@Component({
  name: 'Login',
  components: {
    AdModel,
  },
})
export default class Login extends Vue {
  private isActive: boolean = true;
  private isShowLang: boolean = false;
  private showAreaCode: boolean = false;
  private lang: string = '';
  private areaCode: string = '86';
  private userPhone: string = '16666666666';
  private userPassword: string = '666666';
  private columns: Array<any> = [];
  private columnsList: Array<any> = [];

  private created() {
    this.columnsList = ArrayUtils.sortByKey(AreaCode,'tel',true);
    this.columnsList.forEach(item => {
      this.columns.push(item.tel);
    });
    this.columns.unshift('86');
    clearTimeout();
    setTimeout(() => {
      this.isActive = false;
    }, 1000);
    // console.log(navigator.language)
    if (navigator.language == 'zh-CN') {
      this.lang = '简体中文';
      this.$i18n.locale = 'zh';
      localStorage.setItem('lang', 'zh');
      this.$store.commit('changeLanguage', 'zh');
    } else {
      this.lang = 'English';
      this.$i18n.locale = 'en';
      localStorage.setItem('lang', 'en');
      this.$store.commit('changeLanguage', 'en');
    }

    // if(localStorage.getItem('lang') == 'en'){
    //   this.lang = 'English';
    //   this.$i18n.locale = 'en';
    //   localStorage.setItem('lang', 'en');
    // }else{
    //   this.lang = '简体中文';
    //   this.$i18n.locale = 'zh';
    //   localStorage.setItem('lang', 'zh');
    // }
  }
  private get seatNumber(): string {
    return this.$store.state.login.voyageInfo.seatNumber;
  }
  // public getUserPhone(e: any) {
  //   console.log(e)
  //   if(e.target.value.length > 11){
  //     this.$toast('数字不可以超出11位')
  //   }
  // }
  public getOnLineDetails() {
    if (navigator.onLine) {
      this.postUserLoginMethod();
    } else {
      this.$toast(this.$i18n.t('toast3'));
    }
  }
  public getUserPhoneLength(e: any) {
    if (e.target.value.length >= 11 && e.keyCode != 8) {
      this.$toast(this.$i18n.t('toast1'));
      this.userPhone = e.target.value.substring(0, 10);
    }
  }
  // public getUserPassword(e: any) {
  //   this.userPassword = e.target.value;
  // }
  public onDecode(decodedString) {
    console.log(decodedString);
    // ...
  }
  public clickShowAreaCode() {
    this.showAreaCode = true;
  }
  public onConfirm(value: any) {
    this.areaCode = value;
    this.showAreaCode = false;
  }
  public showLang() {
    this.isShowLang = !this.isShowLang;
  }
  public changeEn() {
    this.lang = 'English';
    this.$i18n.locale = 'en';
    localStorage.setItem('lang', 'en');
  }
  public changeZh() {
    this.lang = '简体中文';
    this.$i18n.locale = 'zh';
    localStorage.setItem('lang', 'zh');
  }
  public postUserLogin() {
    if (this.userPhone== '') {
      this.$toast(this.$i18n.t('showError'));
    } else if (this.userPassword == '') {
      this.$toast(this.$i18n.t('noPassword'));
    } else if (this.userPhone != '' && this.userPassword != '') {
      this.getOnLineDetails();
    }
  }
  public postUserLoginMethod() {
    var data = {
      username: this.areaCode+ '_' + this.userPhone, // 默认86
      password: this.userPassword,
    };
    LoginService.postUserLogin(data)
      .then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          // 写入成功后，判断是否有座位
          this.$store
            .dispatch('setUserInfo', {
              name: res.data.userName,
              token: res.data.access_token,
              id: res.data.id,
            })
            .then((res: any) => {
              console.log('token:' + localStore.get('token'));
              LoginService.getUserMe().then((res: any) => {
                if (res.code == 200 && res.data.Seat == null) {
                  this.$router.push({
                    name: 'selectSeat',
                  });
                } else if (res.code == 200 && res.data.Seat.Name) {
                  this.$store.commit('setSeatNumber', res.data.Seat.Name);
                  this.$store.commit('setSeatName', res.data.Seat.Name);
                  this.$store.commit('setSeatType', res.data.Seat.SeatType);
                  this.$router.push({
                    name: 'home',
                  });
                } else {
                  this.$toast(res.message);
                }
              });
            });

          // this.$router.push({
          //   name: "home"
          // });
        } else {
          this.$toast(res.message);
        }
      })
      .catch((error: any) => {
        if (error.code == 500 || error.code == 502) {
          this.$toast(error.message);
        } else if (error.code == 400) {
          this.$toast(this.$i18n.t('toast4'));
        } else {
          this.$toast(this.$i18n.t('toast2'));
        }
      });
  }
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.login {
		  position: relative;
		  left: 0;
		  top: 0;
		  right: 0;
		  bottom: 0;
		  background-color: #00205b;
		  width: 100%;
		  height: 100vh;
		  .login-bg {
		    width: 100%;
		    height: 2.7rem;
		    background-image: url("./images/login_bg.png");
		    background-repeat: no-repeat;
		    background-size: cover;
		  }
		  .title {
		    position: relative;
		    padding: 0.3rem 0 0;
		    font-size: 0.32rem;
		    font-family: PingFangSC-Semibold, PingFang SC;
		    font-weight: 600;
		    color: rgba(255, 255, 255, 1);
		    line-height: 0.32rem;
		    width: 100%;
		    text-align: center;
		    .lang {
		      position: absolute;
		      right: 0.3rem;
		      top: 0.1rem;
		      padding: 0.2rem;
		      font-size: 0.28rem;
		      color: rgba(255, 255, 255, 1);
		      font-weight: 400;
		      .lang-change {
		        display: none;
		        position: absolute;
		        right: 0;
		        top: 0.7rem;
		        width: 100%;
		        height: auto;
		        font-size: 0.28rem;
		        font-weight: 400;
		        text-align: center;
		        .t {
		          padding: 0.1rem 0;
		        }
		      }
		      .lang-change.active {
		        display: block;
		      }
		    }
		  }
		  .form {
		    margin: 0 0.3rem 0;
		    //   background-color: rgba(0, 32, 91, 0.8);
		    .user-details {
		      position: relative;
		      display: flex;
		      border: 0.02rem solid #fff;
		      border-radius: 0.05rem;
		      height: 1rem;
		      .i-icon {
		        width: 0.6rem;
		        height: 1rem;
		        text-align: center;
		        line-height: 1.1rem;
		        padding: 0 0 0 0.2rem;
		        // background-color: #fff;
		      }
		      .form-input {
		        box-sizing: border-box;
		        padding: 0 0 0 0.2rem;
		        flex: 1;
		        background-color: #00205b;
		        font-size: 0.3rem;
		        color: #fff;
		      }
		      .padding1 {
		        padding: 0 0 0 1.2rem;
		      }
		      .area-code {
		        position: absolute;
		        left: 0.8rem;
		        top: 0;
		        min-width: 1rem;
		        line-height: 1rem;
		        color: #fff;
		        font-size: 0.3rem;
		        text-align: center;
		      }
		      .area-code-line {
		        position: absolute;
		        left: 1.8rem;
		        top: 0.25rem;
		        width: 0.02rem;
		        height: 0.5rem;
		        background-color: rgba(255, 255, 255, 0.8);
		      }
		    }
		    .m40 {
		      margin: 0.4rem 0 0 0;
		    }
		  }
		  .min-box {
		    display: flex;
		    margin: 0.5rem 0 0 0;
		    padding: 0 0.3rem;
		    justify-content: space-between;
		    .forgot-password {
		      padding: 0.2rem 0;
		      line-height: 0.2rem;
		      box-sizing: border-box;
		      text-align: right;
		      font-size: 0.26rem;
		      color: rgb(102, 121, 156);
		    }
		    .registery {
		      padding: 0.2rem 0;
		      line-height: 0.2rem;
		      text-align: center;
		      box-sizing: border-box;
		      font-size: 0.26rem;
		      color: #fff;
		      text-decoration: underline;
		    }
		  }
		
		  .button-box {
		    box-sizing: border-box;
		    margin: 0.65rem 0 0;
		    padding: 0 0.3rem;
		    .button {
		      background-color: #00aec7;
		      color: #fff;
		      width: 100%;
		      height: 1rem;
		      text-align: center;
		      line-height: 1rem;
		      border-radius: 0.5rem;
		      font-size: 0.36rem;
		      font-weight: bold;
		    }
		  }
		
		  .login-other {
		    display: flex;
		    height: 1rem;
		    margin: 0.4rem 0 0 0;
		    .f1 {
		      flex: 1;
		      text-align: center;
		      height: 1rem;
		      img {
		        width: 0.64rem;
		        height: 0.64rem;
		      }
		      .login-other-name {
		        font-size: 0.22rem;
		        color: rgb(102, 121, 156);
		      }
		    }
		  }
		  .line {
		    margin: 0.6rem 0 0;
		    position: relative;
		    width: 100%;
		    border-bottom: 0.01rem solid #fff;
		    .other {
		      position: absolute;
		      right: 0;
		      top: 0;
		      width: 80%;
		      border-bottom: 0.06rem solid #fff;
		    }
		  }
		  .airbus-bg {
		    width: 100%;
		    height: 25vh;
		    background: url("./images/ab_logo.jpg") no-repeat center;
		    background-size: 100%;
		  }
		}
		.icon-text {
		  font-size: 0.6rem;
		  color: #fff;
		}
	}
	
	@media  (orientation:landscape) {
		.login {
		  position: absolute;
		  left: 0;
		  top: 0;
		  right: 0;
		  bottom: 0;
		  background-color: #00205b;
		  width: 100%;
		  height: 100%;
		  overflow: hidden;
		  
		  .login-main-ctn{
		/* 	  width:rpx(436);
			  margin:auto;
			  position: absolute;
			  bottom: rpx(130); */
			  
			  position: absolute;
				bottom: rpx(130);
				padding: 0 rpx(310);
				left: 0;
				right: 0;
		
			  .login-bg {
			    width: 100%;
			    height: 2.7rem;
			    background-image: url("./images/login_bg.png");
			    background-repeat: no-repeat;
			    background-size: cover;
			  }
			  .title {
			    position: relative;
			    padding: 0.3rem 0 0;
			    font-size: 0.32rem;
			    font-family: PingFangSC-Semibold, PingFang SC;
			    font-weight: 600;
			    color: rgba(255, 255, 255, 1);
			    line-height: 0.32rem;
			    width: 100%;
			    text-align: center;
			    .lang {
			      position: absolute;
			      right: 0.3rem;
			      top: 0.1rem;
			      padding: 0.2rem;
			      font-size: 0.28rem;
			      color: rgba(255, 255, 255, 1);
			      font-weight: 400;
			      .lang-change {
			        display: none;
			        position: absolute;
			        right: 0;
			        top: 0.7rem;
			        width: 100%;
			        height: auto;
			        font-size: 0.28rem;
			        font-weight: 400;
			        text-align: center;
			        .t {
			          padding: 0.1rem 0;
			        }
			      }
			      .lang-change.active {
			        display: block;
			      }
			    }
			  }
			  .form {
			    // margin: 0 0.3rem 0;
			    //   background-color: rgba(0, 32, 91, 0.8);
			    .user-details {
			      position: relative;
			      display: flex;
			      border: rpx(2) solid #fff;
			      border-radius:rpx(5) ;
				  box-sizing: border-box;
			      height: rpx(50);
			      .i-icon {
			        // width: 0.6rem;
			        height: rpx(46);
			        text-align: center;
			        line-height:rpx(46);
			        padding: 0 0 0 rpx(12);
					
					>.icon{
						position: relative;
						top:rpx(4);
						width: rpx(30);
						height: rpx(30);
					}
			        // background-color: #fff;
			      }
			      .form-input {
			        box-sizing: border-box;
			        /* padding: 0 0 0 0.2rem; */
			        flex: 1;
			        background-color: #00205b;
			        /* font-size: 0.3rem; */
			        color: #fff;
					
					box-sizing: border-box;
					    padding: 0 0 0 0.2rem;
					    -webkit-box-flex: 1;
					    -webkit-flex: 1;
					    flex: 1;
					    background-color: #00205b;
					    font-size: rpx(16);
					    color: #fff;
					    display: inline-block;
					    width: rpx(240);
			      }
			      .padding1 {
			        
					    padding: 0 0 0 rpx(70);
			      }
			      .area-code {
			       /* position: absolute;
			        left: 0.8rem;
			        top: 0;
			        min-width: 1rem;
			        line-height: 1rem;
			        color: #fff;
			        font-size: 0.3rem;
			        text-align: center; */
					
					position: absolute;
					    left: rpx(60);
					    top: 0;
					    /* min-width: 1rem; */
					    line-height: rpx(46);
					    color: #fff;
					    font-size: rpx(16);
					    text-align: center;
			      }
			      .area-code-line {
			     
					
					    position: absolute;
					    left: rpx(100);
					    top: rpx(14);
					    width: rpx(2);
					    height: rpx(18);
					    background-color: rgba(255, 255, 255, 0.8);
			      }
			    }
			    .m40 {
			      margin: 0.4rem 0 0 0;
			    }
			  }
			  .min-box {
			    display: flex;
			    margin-top: rpx(20);
				margin-bottom: rpx(20);
			    // padding: 0 0.3rem;
			    justify-content: space-between;
				line-height: rpx(18);
				font-size: rpx(14);
				
			    .forgot-password {
			   
			     
			      color: rgb(102, 121, 156);
			    }
			    .registery {
			   
			      color: #fff;
			      text-decoration: underline;
			    }
			  }
			  		
			  .button-box {
			    box-sizing: border-box;
			    margin-bottom:rpx(100);
			    // padding: 0 0.3rem;
			    .button {
			      background-color: #00aec7;
			      color: #fff;
			      width: 100%;
			      height: rpx(50);
			      text-align: center;
			      line-height: rpx(50);
			      border-radius: rpx(25);
			      font-size: rpx(18);
			      font-weight: bold;
			    }
			  }
			  		
			  .login-other {
				  display: none;
			    // display: flex;
			    height: 1rem;
			    margin: 0.4rem 0 0 0;
			    .f1 {
			      flex: 1;
			      text-align: center;
			      height: 1rem;
			      img {
			        width: 0.64rem;
			        height: 0.64rem;
			      }
			      .login-other-name {
			        font-size: 0.22rem;
			        color: rgb(102, 121, 156);
			      }
			    }
			  }
		  }
		  
		  .login-footer-ctn{
			  position: absolute;
			  left: 0;
			  bottom: 0;
			  width: 100%;
			  height: rpx(130);
			  
			  .line {
				
				    position: absolute;
				    width: 100%;
				    border-bottom: rpx(1) solid #fff;
					
			    .other {
			      position: absolute;
			      right: 0;
			      top: 0;
			      width: 80%;
			      border-bottom: 0.06rem solid #fff;
			    }
			  }
			  .airbus-bg {
			    width: 100%;
			    background: url("./images/ab_logo.jpg") no-repeat center;
				background-size: rpx(400) auto;
				height: 100%;
				background-position: center;
				
			
			  }
		  }
		  
		  
		}
	
	}

</style>