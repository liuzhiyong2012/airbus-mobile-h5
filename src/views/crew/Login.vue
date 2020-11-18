<template>
  <section class="crew-login-ctn">
    <div class="main-ctn">
      <div class="top-ctn">
        <div class="login-form-ctn">
          <div class="form-field-ctn">
            <div class="icon-ctn">
              <i class="icon icon-user"></i>
            </div>
            <input
              class="field-input"
              type="text"
              :placeholder="$t('User')"
              v-model="userName"
            />
          </div>
        </div>
        <div class="login-form-ctn">
          <div class="form-field-ctn">
            <div class="icon-ctn">
              <i class="icon icon-user"></i>
            </div>
            <input
              class="field-input"
              type="text"
              :placeholder="$t('Password')"
              v-model="passWord"
            />
          </div>
        </div>

        <div class="login-btn" @click="login">{{ $t("Login") }}</div>
      </div>

      <div class="bottom-ctn">
        <img class="logo-img" src="./images/logo.png" alt="" />
      </div>
    </div>
  </section>
</template>

<i18n>
	{
		"zh":{
			"title":"餐品列表",
			"Password":"密码",
			"User":"用户名",
			"toast1":"请输入用户名",
			"toast2":"请输入密码",
			"Login":"登录"
		},
		"en":{
			"title":"Dish",
			"Password":"Password",
			"User":"User",
			"toast1":"Please enter one user name",
			"toast2":"Please input a password",
			"Login":"Login"
		}
	}
</i18n>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "CrewLogin",
  components: {
    // AbusTitle
  },
})
export default class CrewLogin extends Vue {
  private userName: string | number = "";
  private passWord: string | number = "";
  public created() {
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  }

  public login(): void {
    if (!this.userName) {
      this.$toast(this.$i18n.t("toast1"));
      return;
    }

    if (!this.passWord) {
      this.$toast(this.$i18n.t("toast2"));
      return;
    }

    this.$router.push({
      name: "crewCatering",
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

// 订餐页面统计
// 流量服务
// 购物  //IFE端的
.van-list__finished-text{
	font-size: .28rem !important;
}
.crew-login-ctn {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #002468;
  .main-ctn {
    display: flex;

    position: relative;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .top-ctn {
      height: rem(1020px);
      padding-top: rem(294px);
      box-sizing: border-box;

      border-bottom: rem(4px) solid #ffffff;

      .login-form-ctn {
        display: flex;
        justify-content: center;

        .form-field-ctn {
          display: flex;
          align-items: center;
          width: rem(700px);
          height: rem(120px);
          border: rem(4px) solid rgba(255, 255, 255, 1);

          &:nth-child(1) {
            margin-bottom: rem(60px);
          }

          .icon-ctn {
            margin-left: rem(26px);
            .icon {
              color: #ffffff;
              font-size: rem(48px);
            }
          }

          .field-input {
            box-sizing: border-box;
            padding: 0 rem(26px);
            flex: 1;
            line-height: rem(48px);
            font-size: rem(38px);
            font-weight: 400;
            background: transparent;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
      .login-btn {
        margin: auto;
        text-align: center;
        width: rem(700px);
        height: rem(120px);
        background: rgba(0, 174, 199, 1);
        border-radius: rem(60px);
        font-size: rem(44px);
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: rem(120px);
      }
    }
    .bottom-ctn {
      position: relative;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: rem(1400px);
        height: rem(6px);
        background: #ffffff;
      }
      .logo-img {
        display: block;
        width: rem(570px);
        margin: rem(140px) auto 0;
      }
    }
  }
}
</style>
