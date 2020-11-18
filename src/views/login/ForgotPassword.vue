<template>
  <div class="forgot-password">
    <abus-title :title="$t('ForgotPassword')"></abus-title>
    <div class="tab">
      <div class="place active">
        <div class="place-icon">1</div>
      </div>
      <div :class="[isActiveTwo? 'f1 active': 'f1']"></div>
      <div :class="[isActiveTwo? 'place active': 'place']">
        <div class="place-icon">2</div>
      </div>
      <div :class="[isActiveThr? 'f1 active': 'f1']"></div>
      <div :class="[isActiveThr? 'place active': 'place']">
        <div class="place-icon">3</div>
      </div>
    </div>
    <div class="tab-flex">
      <div class="text1">{{$t('PhoneNumber')}}</div>
      <div class="text1">{{$t('IdentityVerification')}}</div>
      <div class="text1">{{$t('NewPassword')}}</div>
    </div>
    <div class="tab-con">
      <div class="item" :style="{width: fullWidth * 3 + 'px', left: aLeft + 'px'}">
        <div class="f1">
          <div class="main-box">
            <div class="title">{{$t('Phone')}}</div>
            <!-- @change="getPhoneNum($event)" -->
            <!-- 限制11位 -->
            <!-- <input 
            class="flex1" 
            oninput="value=value.replace(/[^\d.]/g,'')"
            :placeholder="$t('PhoneTips')" 
            @keydown="getUserPhoneLength"
            v-model="phone" 
            type="number" /> -->
            <!-- 不限制11位 -->
            <input 
            class="flex1" 
            oninput="value=value.replace(/[^\d.]/g,'')"
            :placeholder="$t('PhoneTips')" 
            v-model="phone" 
            type="number" />
          </div>
          <div class="next" @click="postCheckPhone">{{$t('Next')}}</div>
        </div>
        <div class="f1">
          <ul class="ul-box">
            <li :class="[isShowSMS? 'collapse-item active': 'collapse-item']">
              <div class="collapse-item-title" @click="showSMS">{{$t('SMSVerification')}}</div>
              <div class="collapse-item-con">
                <div class="collapse-item-main">
                  <div class="title">{{$t('Phone')}}</div>
                  <div class="flex1 no-inp">{{phone}}</div>
                </div>
                <div class="collapse-item-main no-pad on-sms">
                  <div class="title">{{$t('VerificationCode')}}</div>
                  <input
                    class="flex1"
                    v-model="code"
                    :placeholder="$t('VerificationCodeTips')"
                    type="text"
                  />
                  <!-- <div class="on-sms">获取验证码</div> -->
                  <div v-if="isShowCode" class="sms-code" @click="getVerificationCode">{{$t('GetCode')}}</div>
                  <div v-else class="sms-code">{{countdown}}s</div>
                </div>
              </div>
            </li>
            <li :class="[isshowSecurityProblem? 'collapse-item active': 'collapse-item']">
              <div
                class="collapse-item-title"
                @click="showSecurityProblem"
              >{{$t('SecurityProblem')}}</div>
              <div class="collapse-item-con add-height">
                <div class="collapse-item-main">
                  <div class="title">{{$t('SecurityIssues')}}</div>
                  <div class="flex1 no-inp add-line-h">{{question}}</div>
                </div>
                <div class="collapse-item-main no-pad">
                  <div class="title">{{$t('SecurityAnswer')}}</div>
                  <input
                    v-model="answer"
                    class="flex1"
                    :placeholder="$t('SecurityAnswerTips')"
                    type="text"
                  />
                </div>
              </div>
            </li>
          </ul>
          <div class="next" @click="onClickTwo">{{$t('Next')}}</div>
        </div>
        <div class="f1">
          <div class="main-box line-height">
            <div class="title pad">{{$t('NewPassword')}}</div>
            <input
              v-model="newPassword"
              class="flex1"
              :placeholder="$t('NewPasswordTips')"
              type="password"
              @blur="checkUserPassword"
            />
          </div>
          <div class="main-box no-pad line-height">
            <div class="title pad">{{$t('ConfirmPassword')}}</div>
            <input
              v-model="confirmPassword"
              class="flex1"
              :placeholder="$t('ConfirmPasswordTips')"
              type="password"
              @blur="checkUserPassword"
            />
          </div>
          <div class="next" @click="onClickConfirm">{{$t('Confirm')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<i18n>
  {
    "zh":{
      "ForgotPassword": "忘记密码",
      "PhoneNumber":"你的手机号",
      "IdentityVerification": "身份验证",
      "NewPassword":"新密码",
      "Phone":"手机号",
      "PhoneTips":"请输入手机号码",
      "Next":"下一步",
      "SMSVerification":"短信验证",
      "VerificationCode":"验证码",
      "VerificationCodeTips":"请输入验证码",
      "SecurityProblem":"安全问题验证",
      "SecurityIssues":"安全问题",
      "SecurityAnswer":"问题答案",
      "SecurityAnswerTips":"请输入你的答案",
      "NewPasswordTips":"请输入新密码",
      "ConfirmPassword":"确认密码",
      "ConfirmPasswordTips":"请再次输入密码",
      "GetCode":"获取验证码",
      "toast1":"手机号码不可以超出11位",
      "toast2":"请从列表中选择一个项目",
      "toast3":"密码不能少于6位",
      "toast4":"密码不一致",
      "toast5":"请输入新密码",
      "toast6":"服务端错误",
      "Confirm":"确认"
    },
    "en":{
      "ForgotPassword": "Forgot Password",
      "PhoneNumber":"Your phone number",
      "IdentityVerification": "Identity verification",
      "NewPassword":"New password",
      "Phone":"Phone",
      "PhoneTips":"Enter your phone number",
      "Next":"Next",
      "SMSVerification":"SMS verification",
      "VerificationCode":"Verification Code",
      "VerificationCodeTips":"Enter Verification Code",
      "SecurityProblem":"Security problem verification",
      "SecurityIssues":"security questions",
      "SecurityAnswer":"Security answer",
      "SecurityAnswerTips":"Please enter your answer",
      "NewPasswordTips":"Please set new password",
      "ConfirmPassword":"Confirm password",
      "ConfirmPasswordTips":"Please Confirm password",
      "GetCode":"Verification Code",
      "toast1":"Phone number cannot exceed 11 digits",
      "toast2":"Please select an item from the list",
      "toast3":"The password cannot be less than 6 digits",
      "toast4":"Password inconsistency",
      "toast5":"Please set new password",
      "toast6":"Server error",
      "Confirm":"Confirm"
    }
  }
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoginService from '../../service/login';
import AbusTitle from '../../components/AbusTitle.vue';
@Component({
  name: 'ForgotPassword',
  components: { AbusTitle },
})
export default class ForgotPassword extends Vue {
  private isActiveTwo: boolean = false;
  private isActiveThr: boolean = false;
  private isShowCode: boolean = true;
  private isShowSMS: boolean = false;
  private isshowSecurityProblem: boolean = false;
  private fullWidth: number = 750;
  private countdown: number = 60;
  private aLeft: number = 0;
  private phone: string = '';
  private code: string = '';
  private question: string = '';
  private answer: string = '';
  private password: string = '';
  private newPassword: string = '';
  private confirmPassword: string = '';
  private userId: string = '';

  private created() {
    this.fullWidth = document.documentElement.clientWidth;
  }
  private mounted() {
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
  }
  public getUserPhoneLength(e:any){
    if(e.target.value.length >= 11 && e.keyCode != 8){
      this.$toast(this.$i18n.t('toast1'));
      this.phone = e.target.value.substring(0,10);
    }
  }
  // 验证手机号是否注册
  public postCheckPhone() {
    var data = {
      phone: this.phone,
    };
    //JSON.stringify(data)
    LoginService.postCheckPhone(data)
      .then((res: any) => {
        if (res.code == 200) {
          this.userId = res.data.id;
          this.question = res.data.question;
          this.aLeft = -this.fullWidth;
          this.isActiveTwo = true;
        } else {
          this.$toast(res.message);
        }
      })
      .catch((reason: any) => {
        console.log('=== Error ===');
        if(reason.code == 500 || reason.code == 502){
          this.$toast(this.$i18n.t('toast6'));
        }else if(reason.code == 400){
          this.$toast(reason.message);
        }else {
          this.$toast(reason.message != '' ? this.$i18n.t('toast6'):reason.message);
        }
      });
  }
  // 验证码请求接口
  public getVerificationCode() {
    let data = {
      phone: this.phone,
    };
    // 验证码请求接口位置
    LoginService.postSendCode(data)
      .then((res: any) => {
        if (res.code == 200) {
          clearInterval(intervalId);
          this.isShowCode = false;
          var intervalId = setInterval(() => {
            this.countdown = this.countdown - 1;
            if (this.countdown == 0) {
              clearInterval(intervalId);
              this.countdown = 60;
              this.isShowCode = true;
            }
          }, 1000);
        } else {
          this.$toast(res.message);
        }
      })
      .catch((reason: any) => {
        console.log('=== Error ===');
        this.$toast(reason.message);
      });
  }
  public onClickTwo() {
    if (this.isshowSecurityProblem) {
      var data = {
        id: this.userId,
        answer: this.answer,
      };
      LoginService.postCheckAnswer(data)
        .then((res: any) => {
          if (res.code == 200) {
            this.password = res.data.password;
            this.aLeft = -(this.fullWidth * 2);
            this.isActiveThr = true;
          } else {
            this.$toast(res.message);
          }
        })
        .catch((reason: any) => {
          console.log('=== Error ===');
          console.log(reason);
          this.$toast(reason.message);
        });
    } else if (this.isShowSMS) {
      var aData = {
        phone: this.phone,
        code: this.code,
      };
      // 验证码验证
      LoginService.postCheckCode(aData).then((res: any) => {
        if (res.code == 200) {
          this.password = res.data.password;
          this.aLeft = -(this.fullWidth * 2);
          this.isActiveThr = true;
        } else {
          this.$toast(res.message);
        }
      })
      .catch((reason: any) => {
          this.$toast(reason.message);
        });
    } else {
      this.$toast(this.$i18n.t('toast2'));
    }
  }
  public checkUserPassword(e: any) {
    if (e.target.value.length < 6) {
      this.$toast(this.$i18n.t('toast3'));
    }
  }
  public onClickConfirm() {
    if (this.newPassword != '' && this.newPassword == this.confirmPassword) {
      var data = {
        id: this.userId,
        password: this.password,
        newPassword: this.newPassword,
      };
      LoginService.postResetPassword(data).then((res: any) => {
        if (res.code == 200) {
          this.aLeft = 0;
          this.isActiveTwo = false;
          this.isActiveThr = false;
          this.$router.push({
            path: '/login',
          });
        } else {
          this.$toast(res.message);
        }
      }).catch((reason:any) => {
        this.$toast(reason.message);
      });
    } else if (
      this.newPassword != '' &&
      this.newPassword != this.confirmPassword
    ) {
      this.$toast(this.$i18n.t('toast4'));
    } else {
      this.$toast(this.$i18n.t('toast5'));
    }
  }
  public showSMS() {
    this.isShowSMS = true;
    this.isshowSecurityProblem = false;
  }
  public showSecurityProblem() {
    this.isShowSMS = false;
    this.isshowSecurityProblem = true;
  }
}
</script>

<style lang="scss" scoped>
	
	@import '../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.forgot-password {
		  min-height: 100vh;
		  overflow: hidden;
		  .tab {
		    box-sizing: border-box;
		    display: flex;
		    align-items: baseline;
		    padding: 0.4rem 1rem 0;
		    height: 1rem;
		    .place {
		      position: relative;
		      font-size: 0.24rem;
		      color: rgb(0, 32, 91);
		      .place-icon {
		        box-sizing: border-box;
		        width: 0.45rem;
		        height: 0.45rem;
		        border: 0.02rem dashed rgba(51, 51, 51, 0.2);
		        border-radius: 50%;
		        text-align: center;
		        line-height: 0.42rem;
		        font-weight: bold;
		        color: rgba(168, 168, 168, 1);
		        font-size: 0.28rem;
		      }
		      .text {
		        position: absolute;
		        left: -0.75rem;
		        top: 0.6rem;
		        width: 3rem;
		        font-size: 0.24rem;
		        color: rgba(51, 51, 51, 1);
		        line-height: 0.24rem;
		      }
		    }
		    .place.active {
		      .place-icon {
		        background-color: #00205b;
		        color: #fff;
		        border: 0.02rem solid #00205b;
		        transition: all ease-out 0.3s;
		      }
		      .text {
		        color: #00205b;
		        font-weight: bold;
		      }
		    }
		    .f1 {
		      height: 0.08rem;
		      flex: 1;
		      border-top: 0.02rem dashed #cfcfcf;
		    }
		    .f1.active {
		      border-top: 0.02rem solid #00205b;
		      transition: all ease-out 0.3s;
		    }
		  }
		  .tab-flex {
		    display: flex;
		    text-align: center;
		    padding: 0 0 0.3rem 0;
		    .text1 {
		      flex: 1;
		      font-size: 0.24rem;
		      color: rgba(51, 51, 51, 1);
		      line-height: 0.24rem;
		    }
		  }
		  .tab-con {
		    position: relative;
		    width: 100%;
		    min-height: 60vh;
		    overflow: hidden;
		    .item {
		      display: flex;
		      position: absolute;
		      left: 0;
		      top: 0;
		      background-color: #fafafa;
		      transition: all ease-out 0.3s;
		
		      .f1 {
		        flex: 1;
		        .main-box {
		          box-sizing: border-box;
		          display: flex;
		          padding: 0.3rem;
		          height: 1.6rem;
		          background-color: #fff;
		          color: rgba(51, 51, 51, 1);
		          line-height: 1rem;
		          .title {
		            width: 1.6rem;
		          }
		          .title.pad {
		            display: flex;
		            align-items: center;
		          }
		          .flex1 {
		            flex: 1;
		            padding: 0 0 0 0.24rem;
		            border: 0.02rem solid rgba(51, 51, 51, 0.1);
		            border-radius: 0.04rem;
		          }
		        }
		        .main-box.no-pad {
		          height: 1.3rem;
		          padding: 0 0.3rem 0.3rem;
		        }
		        .main-box.line-height {
		          line-height: 0.32rem;
		        }
		        .next {
		          margin: 0.3rem;
		          height: 0.8rem;
		          background: rgba(0, 32, 91, 1);
		          border-radius: 0.5rem;
		          color: #fff;
		          line-height: 0.8rem;
		          text-align: center;
		          font-weight: bold;
		          font-size: 0.34rem;
		        }
		        .ul-box {
		          padding: 0 0.3rem;
		          background: #fff;
		          .collapse-item {
		            position: relative;
		            overflow: hidden;
		            .collapse-item-title {
		              padding: 0.46rem 0;
		              color: #333;
		              background: #fff;
		            }
		            .on-sms {
		              position: relative;
		            }
		            .sms-code {
		              position: absolute;
		              right: 0.35rem;
		              top: 0.05rem;
		              padding: 0.2rem;
		              font-size: 0.24rem;
		              min-width: 1rem;
		              color: #fff;
		              background: rgba(0, 32, 91, 1);
		              line-height: 0.5rem;
		              border-radius: 0.1rem;
		              text-align: center;
		            }
		            .collapse-item-con {
		              height: 0;
		              background: #f3f2f9;
		              transition: all ease-in-out 0.3s;
		              .collapse-item-main {
		                box-sizing: border-box;
		                display: flex;
		                padding: 0.3rem;
		                color: rgba(51, 51, 51, 1);
		                line-height: 0.32rem;
		                .title {
		                  width: 1.6rem;
		                  line-height: 0.5rem;
		                  display: flex;
		                  align-items: center;
		                }
		                .title.pad {
		                  // padding: 0.2rem 0 0 0;
		                  display: flex;
		                  align-items: center;
		                }
		                .flex1 {
		                  flex: 1;
		                  padding: 0 0 0 0.24rem;
		                  border: 0.02rem solid rgba(51, 51, 51, 0.1);
		                  border-radius: 0.04rem;
		                  background-color: #f3f2f9;
		                }
		
		                .flex1.no-inp {
		                  padding: 0;
		                  line-height: 0.5rem;
		                  border: none;
		                }
		                .flex1.add-line-h {
		                  line-height: 1rem;
		                }
		              }
		              .collapse-item-main.no-pad {
		                padding: 0 0.3rem 0.3rem;
		                height: 1.3rem;
		              }
		              .main-boxcollapse-item-main.line-height {
		                line-height: 0.32rem;
		              }
		            }
		          }
		          .collapse-item.active {
		            .collapse-item-con {
		              height: 2.4rem;
		              .main-boxcollapse-item-main.no-pad {
		                padding: 0 0.3rem 0.3rem;
		              }
		            }
		            .add-height {
		              height: 2.9rem;
		            }
		            .add-line-h {
		              line-height: 1rem;
		            }
		            .collapse-item-title {
		              color: #001f5b;
		              font-weight: bold;
		            }
		          }
		        }
		      }
		    }
		  }
		}
	}
	
	@media  (orientation:landscape) {
		.forgot-password {
		  min-height: 100vh;
		  overflow: hidden;
		  .tab {
		    // box-sizing: border-box;
		    display: flex;
		    align-items: baseline;
		    padding: rpx(42) rpx(270) 0;
		    height: rpx(34);
		    .place {
		      position: relative;
		      font-size: 0.24rem;
		      color: rgb(0, 32, 91);
		      .place-icon {
		        box-sizing: border-box;
		        width: rpx(24);
		        height: rpx(24);
		        border: rpx(2) dashed rgba(51, 51, 51, 0.2);
		        border-radius: 50%;
		        text-align: center;
		        line-height:rpx(20);
		        font-weight: bold;
		        color: rgba(168, 168, 168, 1);
		        font-size:  rpx(14);
		      }
		      .text {
		        position: absolute;
		        left: -0.75rem;
		        top: 0.6rem;
		        width: 3rem;
		        font-size: 0.24rem;
		        color: rgba(51, 51, 51, 1);
		        line-height: 0.24rem;
		      }
		    }
		    .place.active {
		      .place-icon {
		        background-color: #00205b;
		        color: #fff;
		        border: 0.02rem solid #00205b;
		        transition: all ease-out 0.3s;
		      }
		      .text {
		        color: #00205b;
		        font-weight: bold;
		      }
		    }
		    .f1 {
		      height: 0.08rem;
		      flex: 1;
		      border-top: 0.02rem dashed #cfcfcf;
		    }
		    .f1.active {
		      border-top: 0.02rem solid #00205b;
		      transition: all ease-out 0.3s;
		    }
		  }
		  .tab-flex {
		    display: flex;
		    text-align: center;
		    padding: 0 rpx(180) rpx(40);
		    .text1 {
		      flex: 1;
		      font-size: rpx(12);
		      color: rgba(51, 51, 51, 1);
		      line-height:  rpx(12);
		    }
		  }
		  .tab-con {
		    position: relative;
		    width: 100%;
		    min-height: 60vh;
		    overflow: hidden;
		    .item {
		      display: flex;
		      position: absolute;
		      left: 0;
		      top: 0;
		      background-color: #fafafa;
		      transition: all ease-out 0.3s;
		
		      .f1 {
		        flex: 1;
		        .main-box {
		          // box-sizing: border-box;
		          display: flex;
		          padding:rpx(104) rpx(310);
		          // height: 1.6rem;
		          background-color: #fff;
		          color: rgba(51, 51, 51, 1);
				  align-items: center;
		          // line-height: 1rem;
		          .title {
		            // width: 1.6rem;
					
					font-size: rpx(14);
					font-family: Helvetica;
					color: #333333;
					line-height: rpx(16);
					display: inline-block;
					    white-space: nowrap;
						padding-right: rpx(32);
		          }
		          .title.pad {
		            display: flex;
		            align-items: center;
		          }
		          .flex1 {
		            flex: 1;
					font-size: rpx(14);
					height: rpx(40);
					line-height: rpx(16);
		            padding: 0 0 0 rpx(12);
		            border: 0.02rem solid rgba(51, 51, 51, 0.1);
		            border-radius: 0.04rem;
		          }
		        }
		        .main-box.no-pad {
		              padding: 0rem rpx(310) rpx(40) !important;
		        }
		        .main-box.line-height {
				  line-height: 0.32rem;
				      padding: rpx(40) rpx(310);
		        }
				
		        .next {
		          margin: auto;
				  margin-top:rpx(40);
				  width: rpx(340);
		          height: rpx(40);
		          background: rgba(0, 32, 91, 1);
		          border-radius: 0.5rem;
		          color: #fff;
		          line-height: rpx(40);
		          text-align: center;
		          font-weight: bold;
		          font-size: rpx(16);
		        }
		        .ul-box {
		          padding: 0;
		          background: #fff;
		          .collapse-item {
		            position: relative;
		            overflow: hidden;
		            .collapse-item-title {
					  padding: rpx(20) rpx(310);
		              color: #333;
		              background: #fff;
					  font-size: rpx(14);
					  line-height: rpx(16);
		            }
		            .on-sms {
		              position: relative;
		            }
		            .sms-code {
		              position: absolute;
		              right: 0;
		              top: 0;
		              padding: 0;
		              font-size: rpx(14);
		               min-width: 1rem;
		              color: #fff;
		              background: rgba(0, 32, 91, 1);
		              line-height: rpx(40);
		              border-radius: rpx(4);
		              text-align: center;
		            }
		            .collapse-item-con {
		              height: 0;
		              background: #f3f2f9;
					  padding:0 rpx(310);
		              transition: all ease-in-out 0.3s;
		              .collapse-item-main {
		                box-sizing: border-box;
		                display: flex;
		                padding: rpx(24) 0 0 0;
		                color: rgba(51, 51, 51, 1);
		                line-height: 0.32rem;
		                .title {
		                  width: rpx(88);
		                  line-height: rpx(16);
						  font-size: rpx(14);
		                  display: flex;
		                  align-items: center;
		                }
		                .title.pad {
		                  // padding: 0.2rem 0 0 0;
		                  display: flex;
		                  align-items: center;
		                }
		                .flex1 {
							line-height: rpx(40);
							height: rpx(40);
							font-size: rpx(14);
		                  flex: 1;
		                  padding: 0 0 0 rpx(12);
		                  border: 0.02rem solid rgba(51, 51, 51, 0.1);
		                  border-radius: rpx(4);
		                  background-color: #f3f2f9;
						  box-sizing: border-box;
		                }
		
		                .flex1.no-inp {
		                  padding: 0;
		                  line-height: rpx(40);
		                  border: none;
		                }
		                .flex1.add-line-h {
		                  line-height: 1rem;
		                }
		              }
		              .collapse-item-main.no-pad {
		                padding: 0  0 rpx(24) 0;
		                // height: 1.3rem;
		              }
		              .main-boxcollapse-item-main.line-height {
		                line-height: 0.32rem;
		              }
		            }
		          }
		          .collapse-item.active {
		            .collapse-item-con {
		              height: rpx(130);
		              .main-boxcollapse-item-main.no-pad {
		                padding: 0 0.3rem 0.3rem;
		              }
		            }
		            .add-height {
		              height: rpx(130);
		            }
		            .add-line-h {
		              line-height: 1rem;
		            }
		            .collapse-item-title {
		              color: #001f5b;
		              font-weight: bold;
		            }
		          }
		        }
		      }
		    }
		  }
		}
	}
	
	

</style>