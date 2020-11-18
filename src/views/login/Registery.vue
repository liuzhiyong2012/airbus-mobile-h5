<template>
  <div class="registery-ctn">
	  <div class="title-ctn">
		  <abus-title :title="$t('Registery')" @stepTo="setUserDataNull()" />
	  </div>
   
	
    <div class="registery">
      <div class="con">
		  
        <div class="main-item">
          <div class="title line-h">{{ $t("Name") }}</div>
          <input
            v-model="nickname"
            class="main-item-con"
            maxlength="20"
            type="text"
            @change="setNickName"
            :placeholder="$t('NameTips')"
          />
        </div>
        <!-- <div class="main-item">
        <div class="title line-h">{{$t('Portrait')}}</div>
        <van-uploader v-model="fileList" multiple :max-count="1" />
        </div>-->
        <div class="main-item left">
          <div class="title line-h">{{ $t("Gender") }}</div>
		  
          <van-radio-group
            v-model="radio"
            direction="horizontal"
            checked-color="#00205B"
            @change="setRadio"
            icon-size="12px"
          >
            <van-radio name="0">
              <template #icon="props">
                <svg class="icon icon-text" aria-hidden="true">
                  <use v-if="props.checked" xlink:href="#icon-selected" />
                  <use v-else xlink:href="#icon-unselected" />
                </svg>
                <span
				class = "radio-text"
                  :class="[props.checked ? 'text-selected' : 'text-unselected']"
                  >{{ $t("Female") }}</span
                >
              </template>
            </van-radio>
            <van-radio name="1">
              <template #icon="props">
                <svg class="icon icon-text" aria-hidden="true">
                  <use v-if="props.checked" xlink:href="#icon-selected" />
                  <use v-else xlink:href="#icon-unselected" />
                </svg>
                <span
                  :class="[props.checked ? 'text-selected' : 'text-unselected']"
                  >{{ $t("Male") }}</span
                >
              </template>
            </van-radio>
          </van-radio-group>
        </div>
        <!-- <div class="main-item">
          <div class="title line-h">{{$t('Phone')}}</div>
          <input
            v-model="phone"
            class="main-item-con"
            type="number"
            maxlength="20"
            @change="setPhone"
            @keydown="getUserPhoneLength"
            :placeholder="$t('PhoneTips')"
          />
        </div> -->
        <div class="main-item right">
          <div class="title line-h">{{ $t("Phone") }}</div>
          <!-- 限制11位数 -->
          <!-- <input
            v-model="phone"
            class="main-item-con padding4"
            type="number"
            maxlength="20"
            @change="setPhone"
            oninput="value=value.replace(/[^\d.]/g,'')"
            @keydown="getUserPhoneLength"
            :placeholder="$t('PhoneTips')"
          /> -->
          <!-- 不限制位数 -->
          <input
            v-model="phone"
            class="main-item-con padding4"
            type="number"
            maxlength="20"
            @change="setPhone"
            oninput="value=value.replace(/[^\d.]/g,'')"
            :placeholder="$t('PhoneTips')"
          />
          <div class="area-code" @click="clickShowAreaCode">
            + {{ areaCode }}
          </div>
          <div class="area-code-line"></div>
          <van-popup
            v-model="showAreaCode"
            position="bottom"
            :style="{ height: '36%' }"
          >
            <van-picker
              show-toolbar
              :columns="areaCodeColumns"
              @cancel="showAreaCode = false"
              @confirm="onAreaCodeConfirm"
              :default-index="0"
              :cancel-button-text="$t('Cancel')"
              :confirm-button-text="$t('Determine')"
            />
          </van-popup>
        </div>
        <div class="main-item left">
          <div class="title line-h">{{ $t("IDCard") }}</div>
          <input
            v-model="idCard"
            maxlength="25"
            class="main-item-con"
            type="text"
            @change="setIdCard"
            :placeholder="$t('IDCardTips')"
          />
        </div>
        <div class="main-item right">
          <div class="title line-h">{{ $t("Password") }}</div>
          <input
            v-model="password"
            class="main-item-con"
            type="password"
            @change="setPassword"
            :placeholder="$t('PasswordTips')"
            @blur="checkUserPassword"
          />
        </div>
        <div class="main-item left">
          <div class="title">{{ $t("Confirm-password") }}</div>
          <input
            v-model="confirmPassword"
            @blur="checkPassword"
            class="main-item-con"
            type="password"
            @change="setConfirmPassword"
            :placeholder="$t('ConfirmPasswordTips')"
          />
        </div>
        <div class="main-item location right">
          <div class="title line-h">{{ $t("Date") }}</div>
          <input
            class="main-item-con"
            @click="showPopup"
            :value="birthday"
            type="text"
            @change="setBirthday"
            readonly="readonly"
            :placeholder="$t('DateTips')"
          />
          <div class="data-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-date" />
            </svg>
          </div>
          <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '36%' }"
          >
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              :title="$t('Date')"
              :min-date="minDate"
              :max-date="maxDate"
              @cancel="show = false"
              @confirm="getConfirmData"
              :cancel-button-text="$t('Cancel')"
              :confirm-button-text="$t('Determine')"
            />
          </van-popup>
        </div>
        <div class="main-item left">
          <div class="title">{{ $t("Security-issues") }}</div>
          <input
            @click="showQuestion"
            class="main-item-con"
            type="text"
            :value="question"
            readonly="readonly"
            :placeholder="$t('IssuesTips')"
          />
          <van-popup
            v-model="showIssues"
            position="bottom"
            :style="{ height: '36%' }"
          >
            <van-picker
              show-toolbar
              :columns="columns"
              @cancel="showIssues = false"
              @confirm="onConfirm"
              :default-index="1"
              :cancel-button-text="$t('Cancel')"
              :confirm-button-text="$t('Determine')"
            />
          </van-popup>
        </div>
        <div class="main-item right">
          <div class="title">{{ $t("Security-answer") }}</div>
          <input
            v-model="answer"
            class="main-item-con"
            type="text"
            @change="setAnswer"
            :placeholder="$t('AnswerTips')"
          />
        </div>
      </div>
      <p class="policy">
        <svg class="icon icon-read" aria-hidden="true" @click="onClickRead">
          <use v-if="isReaded" xlink:href="#icon-readed_1" />
          <use v-else xlink:href="#icon-unread" />
        </svg>
        <span @click="gotoPrivacy">{{ $t("Privacy") }}</span>
        <span @click="gotoTerms">{{ $t("Terms") }}</span>
      </p>
      <div class="button-box">
        <div class="button" @click="onClickRegistery">
          {{ $t("Registery") }}
        </div>
      </div>
    </div>
  </div>
</template>
<i18n>
	{
		"zh":{
			"Name": "昵称",
			"Portrait":"头像",
			"Gender":"性别",
			"Female":"女",
			"Male":"男",
      "Phone":"手机号",
      "IDCard": "身份证号",
			"Password":"密码",
			"Confirm-password":"确认密码",
			"Date":"出生日期",
			"Security-issues":"密保问题",
      "Security-answer":"密保答案",
      "Privacy":"《隐私政策》",
      "Terms":"《服务条款》",
      "Registery": "注册",
      "NameTips":"请输入你的名字",
      "PhoneTips":"请输入你的手机号码",
      "IDCardTips":"请输入身份证号",
      "PasswordTips":"请输入密码",
      "ConfirmPasswordTips":"请确认密码",
      "DateTips":"请选择你的生日",
      "IssuesTips":"请选择密保问题",
      "AnswerTips":"请输入答案",
      "Cancel":"取消",
      "Determine":"确定",
      "toast1":"手机号码不可以超出11位",
      "toast2":"请先正确填写密码",
      "toast3":"密码不能少于6位",
      "toast4":"密码不一致",
      "toast5":"当前手机号码已注册",
      "toast6":"暂未阅读《隐私政策》、《服务条款》",
      "toast7":"请先填写信息",
      "toast8":"服务端错误",
      "toast9":"密保问题不能为空",
      "toast10":"答案不能为空",
      "Date":"日期"
		},
		"en":{
			"Name": "Name",
			"Portrait":"Portrait",
			"Gender":"Gender",
			"Female":"Female",
			"Male":"Male",
      "Phone":"Phone",
      "IDCard": "IDCard",
			"Password":"Password",
			"Confirm-password":"Confirm password",
			"Date":"Date",
			"Security-issues":"security questions",
      "Security-answer":"Security answer",
      "Privacy":"《Privacy policy》",
      "Terms":"《Terms of service》",
      "Registery": "Sign up",
      "NameTips":"Please enter your name",
      "PhoneTips":"Please enter your phone number",
      "IDCardTips":"Please enter IDCard",
      "PasswordTips":"Please enter your password",
      "ConfirmPasswordTips":"Please Confirm password",
      "DateTips":"Please enter your date",
      "IssuesTips":"Please enter security questions",
      "AnswerTips":"Please enter Security answer",
      "Cancel":"Cancel",
      "Determine":"OK",
      "toast1":"Phone number cannot exceed 11 digits",
      "toast2":"Please fill in the password correctly",
      "toast3":"The password cannot be less than 6 digits",
      "toast4":"Password inconsistency",
      "toast5":"The current mobile number is registered",
      "toast6":"Have you read the 《Privacy policy》《Terms of service》",
      "toast7":"Please complete the information",
      "toast8":"Server error",
      "toast9":"Security question cannot be empty",
      "toast10":"The answer cannot be empty",
      "Date":"Date"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoginService from '../../service/login';
import AbusTitle from '../../components/AbusTitle.vue';
import { localStore } from '../../utils/data-management';
import { AreaCode } from '../../utils/area-code';
import ArrayUtils from '../../utils/array-utils';
@Component({
  name: 'Registery',
  components: {
    AbusTitle,
  },
})
export default class Register extends Vue {
  private fileList: Array<any> = [];
  private radio: string = '0';
  private show: boolean = false;
  private showIssues: boolean = false;
  private isReaded: boolean = false;
  //国际区号
  private areaCode: string = '86';
  private showAreaCode: boolean = false;
  private areaCodeColumns: Array<any> = [];
  private areaCodeColumnsList: Array<any> = [];
  // date
  private minDate: Date = new Date(1930, 1, 1);
  private maxDate: Date = new Date(2020, 7, 1);
  private currentDate: Date = new Date(2000, 1, 15);
  private datetime: string = '';
  private columns: Array<any> = [
    'My father\'s name?',
    'My mother\'s name?',
    'My favorite singer?',
    'My favorite animal?',
  ];
  // 校验密码是否一致
  private isCheckPassword: boolean = false;
  // 用户输入信息
  private nickname: string = '';
  private phone: string = '';
  private idCard: string = '';
  private birthday: string = '';
  private password: string = '';
  private confirmPassword: string = '';
  private question: string = '';
  private answer: string = '';
  private mounted() {
    this.areaCodeColumnsList = ArrayUtils.sortByKey(AreaCode, 'tel', true);
    this.areaCodeColumnsList.forEach((item) => {
      this.areaCodeColumns.push(item.tel);
    });
    this.areaCodeColumns.unshift('86');
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
      this.columns = [
        '我爸爸的名字?',
        '我妈妈的名字?',
        '我最喜欢的歌手?',
        '我最喜欢的动物?',
      ];
    }
    this.getUserChangeData();
  }
  /**
   * 缓存用户输入的信息
   */
  public getUserChangeData() {
    this.getNickName();
    this.getRadio();
    this.getPhone();
    this.getIdCard();
    this.getConfirmPassword();
    this.getPassword();
    this.getBirthday();
    this.getQuestion();
    this.getAnswer();
    this.getCheckPassword();
  }
  public setUserDataNull() {
    localStore.set('nickName', '');
    localStore.set('radio', '0');
    localStore.set('uPhone', '');
    localStore.set('idCard', '');
    localStore.set('uPassword', '');
    localStore.set('confirmPassword', '');
    localStore.set('birthday', '');
    localStore.set('question', '');
    localStore.set('answer', '');
    localStore.set('getCheckPassword', '');
  }
  public setNickName(e) {
    this.nickname = e.target.value;
    localStore.set('nickName', e.target.value);
  }
  public getNickName() {
    if (localStore.get('nickName') != '') {
      this.nickname = localStore.get('nickName');
    }
  }
  public setRadio(e) {
    this.radio = e;
    localStore.set('radio', e);
  }
  public getRadio() {
    if (localStore.get('radio') != '' && localStore.get('radio') != null) {
      this.radio = localStore.get('radio');
    } else {
      this.radio = '0';
    }
  }
  public setPhone(e) {
    this.phone = e.target.value;
    localStore.set('uPhone', e.target.value);
  }
  public getPhone() {
    if (localStore.get('uPhone') != '') {
      this.phone = localStore.get('uPhone');
    }
  }
  public setIdCard(e) {
    this.idCard = e.target.value;
    localStore.set('idCard', e.target.value);
  }
  public getIdCard() {
    if (localStore.get('idCard') != '') {
      this.idCard = localStore.get('idCard');
    }
  }
  public setPassword(e) {
    this.password = e.target.value;
    localStore.set('uPassword', e.target.value);
  }
  public getPassword() {
    if (localStore.get('uPassword') != '') {
      this.password = localStore.get('uPassword');
    }
  }
  public setConfirmPassword(e) {
    this.confirmPassword = e.target.value;
    localStore.set('confirmPassword', e.target.value);
  }
  public getConfirmPassword() {
    if (localStore.get('confirmPassword') != '') {
      this.confirmPassword = localStore.get('confirmPassword');
    }
  }

  public setBirthday(e) {
    localStore.set('birthday',e);
  }
  public getBirthday() {
    if (localStore.get('birthday') != '') {
      this.birthday = localStore.get('birthday');
    }
  }
  public setQuestion(e) {
    this.question = e;
    localStore.set('question', this.question);
  }
  public getQuestion() {
    if (localStore.get('question') != '') {
      this.question = localStore.get('question');
    }
  }
  public setAnswer(e) {
    this.answer = e.target.value;
    localStore.set('answer', e.target.value);
  }
  public getAnswer() {
    if (localStore.get('answer') != '') {
      this.answer = localStore.get('answer');
    }
  }
  public getCheckPassword() {
    if (localStore.get('getCheckPassword') != '') {
      this.isCheckPassword = localStore.get('getCheckPassword');
    }
  }


  public getUserPhoneLength(e: any) {
    if (e.target.value.length >= 11 && e.keyCode != 8) {
      this.$toast(this.$i18n.t('toast1'));
      this.phone = e.target.value.substring(0, 10);
    }
  }
  // 国际区号
  public clickShowAreaCode() {
    this.showAreaCode = true;
  }
  public onAreaCodeConfirm(value: any) {
    this.areaCode = value;
    this.showAreaCode = false;
  }
  public showPopup() {
    if (this.isCheckPassword) {
      this.show = true;
    } else {
      this.$toast(this.$i18n.t('toast2'));
    }
  }

  public showQuestion() {
    this.showIssues = true;
  }
  public onConfirm(value: any) {
    this.question = value;
    this.showIssues = false;
    this.setQuestion(value);
  }
  public onClickRead() {
    this.isReaded = !this.isReaded;
  }
  public getConfirmData(val: any) {
    this.show = false;
    this.currentDate = val;
    this.datetime =
      val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate();
    // this.birthday =
    //   this.datetime +
    //   " " +
    //   val.getHours() +
    //   ":" +
    //   val.getMinutes() +
    //   ":" +
    //   val.getSeconds();
    this.birthday = this.datetime;
    this.setBirthday(this.birthday);
    return val;
  }
  public checkUserPassword(e: any) {
    if (e.target.value.length < 6) {
      this.$toast(this.$i18n.t('toast3'));
    }
  }
  public checkPassword() {
    if (this.password != this.confirmPassword) {
      this.isCheckPassword = false;
      localStore.set('getCheckPassword', false);
      this.$toast(this.$i18n.t('toast4'));
    } else {
      this.isCheckPassword = true;
      localStore.set('getCheckPassword', true);
    }
  }
  public onClickRegistery() {
    if (
      this.phone != '' &&
      this.idCard != '' &&
      this.isCheckPassword &&
      this.isReaded &&
      this.question != '' &&
      this.answer != ''
    ) {
      // (['nickname','gender','phone','idCard','password','birthday','question','answer']);

      var data = {
        nickname: this.nickname,
        gender: this.radio,
        // phone: "86_" + this.phone,
        phone: this.areaCode+ '_' + this.phone,
        idCard: this.idCard,
        password: this.password,
        birthday: this.birthday,
        question: this.question,
        answer: this.answer,
      };
      LoginService.postUserRegistery(data)
        .then((res: any) => {
          if (res.code == 200) {
            // 存储用户信息
            // 写入成功后，判断是否有座位
            this.$store
              .dispatch('setUserInfo', {
                name: res.data.userName,
                token: res.data.access_token,
                id: res.data.id,
                // airbusId: res.data.airbusId,
              })
              .then((res: any) => {
                this.setUserDataNull();
                LoginService.getUserMe().then((res: any) => {
                  // AvatarPath: ""
                  // DisplayName: "mizao"
                  // Email: null
                  // Flow: {flow: -1}
                  // Id: "3a03a40ac79b4f0d6eef58fcd99271d7"
                  // IsWeChatBinded: false
                  // NickName: "mizao"
                  // PhoneNumber: "13570492375"
                  // Seat:{
                  // Id: "1"
                  // Name: "1A"
                  // col: 1
                  // col-number: 1
                  // row: 1
                  // }
                  // __proto__: Object
                  // UserName: "86_13570492375"
                  // WeChatId: null
                  // points: "2000"
                  if (res.code == 200 && res.data.Seat == null) {
                    this.$router.push({
                      name: 'selectSeat',
                    });
                  } else if (res.code == 200 && res.data.Seat.Name) {
                    this.$store.commit('setSeatNumber', res.data.Seat.Name);
                    this.$router.push({
                      name: 'home',
                    });
                  }
                });
              });
          } else {
            this.$toast(res.message);
          }
        })
        .catch((reason: any) => {
          this.$toast(this.$i18n.t('toast5'));
        });
    } else if (!this.isCheckPassword) {
      this.$toast(this.$i18n.t('toast4'));
    } else if (!this.isReaded) {
      this.$toast(this.$i18n.t('toast6'));
    } else if (this.question == '') {
      this.$toast(this.$i18n.t('toast9'));
    } else if (this.answer == '') {
      this.$toast(this.$i18n.t('toast10'));
    } else {
      this.$toast(this.$i18n.t('toast7'));
    }
  }

  public gotoPrivacy() {
    this.$router.push({
      name: 'privacyPolicy',
    });
  }

  public gotoTerms() {
    this.$router.push({
      name: 'termsOfService',
    });
  }
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.area-code {
		  position: absolute;
		  left: 1.7rem;
		  top: 0;
		  width: 0.9rem;
		  line-height: 0.8rem;
		  text-align: center;
		  font-size: .3rem;
		  // color: #666;
		}
		
		.registery {
		  padding: 0.3rem 0 0;
		  box-sizing: border-box;
		  height: 100vh;
		  .con {
		    background-color: #fff;
		    padding: 0.3rem 0.3rem 0;
		    .main-item {
		      position: relative;
		      display: flex;
		      padding: 0 0 0.3rem 0;
		      .title {
		        padding: 0.1rem 0 0;
		        width: 1.7rem;
		        color: #333;
		      }
		      .main-item-con {
		        box-sizing: border-box;
		        padding: 0 0 0 0.3rem;
		        flex: 1;
		        height: 0.8rem;
		        border-radius: 0.04rem;
		        border: 0.02rem solid rgba(51, 51, 51, 0.1);
		        color: #333;
		      }
		      .padding4 {
		        padding: 0 0 0 1rem;
		      }
		      .title.line-h {
		        padding: 0;
		        line-height: 0.8rem;
		      }
		    }
		    .location {
		      position: relative;
		      .data-icon {
		        position: absolute;
		        right: 0.2rem;
		        top: 0.2rem;
		        width: 0.32rem;
		        height: 0.32rem;
		      }
		    }
		  }
		}
		.text-selected,
		.text-unselected {
			
		  font-size: 0.24rem !important;
		}
		.img-icon {
		  width: 0.24rem;
		  height: 0.24rem;
		}
		.policy {
		  margin-left: 0.3rem;
		  font-weight: 400;
		  color: rgba(51, 51, 51, 1);
		  line-height: 0.64rem;
		  font-size: 0.28rem;
		}
		.button-box {
		  margin: 0.1rem 0.3rem 0.5rem;
		  .button {
		    width: 100%;
		    height: 0.8rem;
		    background: rgba(0, 32, 91, 1);
		    border-radius: 0.4rem;
		    text-align: center;
		    line-height: 0.8rem;
		    color: #fff;
		    font-weight: bold;
		  }
		}
		.text-selected {
		  margin: 0 0 0 0.1rem;
		  color: rgba(51, 51, 51, 1);
		  line-height: 0.32rem;
		  transition: all ease-in-out 0.3s;
		}
		.text-unselected {
		  margin: 0 0 0 0.1rem;
		  color: rgba(51, 51, 51, 0.3);
		  line-height: 0.32rem;
		  transition: all ease-in-out 0.3s;
		}
		.icon-text {
		  font-size: 0.22rem;
		  width: 0.22rem;
		  height: 0.22rem;
		}
		.icon-read {
		  width: 0.3rem;
		  height: 0.3rem;
		}
	}
	
	@media  (orientation:landscape) {
		.registery-ctn{
			position: relative;
				.title-ctn{
					left:0;
					width: 100%;
					height: rpx(56);
					border-bottom: 14px solid #fafafa;
					    position: fixed;
					    z-index: 100;
					
				}
				
				.area-code {
				      position: absolute;
				      left: rpx(80);
				      top: 0;
				      line-height: rpx(40);
				      text-align: center;
				      font-size: rpx(14);
				}
				
				.registery {
				  padding: rpx(70) 0 0;
				  box-sizing: border-box;
				  .con {
				    background-color: #fff;
					padding:rpx(40) rpx(300);
					
				    .main-item {
				      position: relative;
				      display: flex;
				      padding: 0 0 0.3rem 0;
				      .title {
				        // padding: 0.1rem 0 0;
						font-size: rpx(14);
						line-height: rpx(40);
				        width: rpx(64);
				        color: #333;
				      }
				      .main-item-con {
						  display: inline-block;
				        box-sizing: border-box;
				        padding: 0 0 0 rpx(16);
				        flex: 1;
						//width: rpx(250);
				        height: rpx(40);
				        border-radius: 0.04rem;
				        border: 0.02rem solid rgba(51, 51, 51, 0.1);
				        color: #333;
						font-size: rpx(14);
						line-height: rpx(40);
				      }
				      .padding4 {
				        padding: 0 0 0 rpx(56);
				      }
				      .title.line-h {
				        padding: 0;
				        line-height: rpx(40);
				      }
				    }
				    .location {
				      position: relative;
				      .data-icon {
				        position: absolute;
				        right: rpx(10);
				        top: rpx(10);
				      
						>.icon{
							vertical-align: top;
							width: rpx(20);
							height: rpx(20);
						}
				      }
				    }
				  }
				}
				.text-selected,
				.text-unselected {
					margin-right: rpx(10) !important;
				  font-size: rpx(12) !important;
				}
				.img-icon {
				  width: 0.24rem;
				  height: 0.24rem;
				}
				.policy {
					margin-top:rpx(40);
					margin-bottom:rpx(14);
					padding:0 rpx(300);
				  // margin-left: 0.3rem;
				  font-weight: 400;
				  color: rgba(51, 51, 51, 1);
				  line-height: rpx(16);
				  font-size: rpx(14);
				  
				}
				.button-box {
				padding:0 rpx(300)  rpx(84);
				  .button {
				    width: 100%;
				    height: rpx(40);
				    background: rgba(0, 32, 91, 1);
				    border-radius: rpx(20);
				    text-align: center;
				    line-height: rpx(40);
				    color: #fff;
				    font-weight: bold;
					font-size: rpx(18);
				  }
				}
				.text-selected {
				  margin: 0 0 0 0.1rem;
				  color: rgba(51, 51, 51, 1);
				  // line-height: 0.32rem;
				  transition: all ease-in-out 0.3s;
				}
				.text-unselected {
				  margin: 0 0 0 0.1rem;
				  color: rgba(51, 51, 51, 0.3);
				  // line-height: 0.32rem;
				  transition: all ease-in-out 0.3s;
				}
				.icon-text {
				  font-size: rpx(14);
				  width:rpx(12);
				  height: rpx(12);
				}
				.icon-read {
				  width: rpx(12);
				  height: rpx(12);
				}
				
			}
			
	}
	

</style>