<template>
  <div class="abus-height">
    <abus-title :title="$t('title')"></abus-title>
    <div class="enter-box">
      <van-field
        v-model="address"
        rows="3"
        autosize
        type="textarea"
        :placeholder="$t('address')"
        show-word-limit
        @input="checkAddress"
      />
    </div>
    <div class="abus-button-box">
      <div class="abus-button" @click="postUpdateAddress">{{$t('Sure')}}</div>
    </div>
  </div>
</template>
<i18n>
	{
		"zh":{
      "title":"收货地址",
      "address":"请输入收货地址",
      "noAddress":"收货地址不能为空",
      "Sure":"确定"
		},
		"en":{
      "title":"Shopping address",
      "address":"Please enter the address",
      "noAddress":"The address cannot be empty",
      "Sure":"OK"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import AbusTitle from "../../../components/AbusTitle.vue";
import MeServer from "../../../service/me"
@Component({
  name: "ShoppingAddress",
  components: {
    AbusTitle,
  },
})
export default class ShoppingAddress extends Vue {
  private address: string = "";

  private created() {
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
   this.postAddress() 
  }
  private mounted() {
    console.log(this.$store.state.me)
    this.address = this.$store.state.me.address;
  }
  private get getAddress() {
    return this.$store.state.me.address;
  }
  @Watch("address", { immediate: true })
  private addressData() {
    this.$store.commit("addressData", this.address);
  }
  public checkAddress(value: string){
    return this.address = value.replace(/\s*/g,"")
  }
  public postUpdateAddress(){
    if(this.address != ''){
      let data = {
        address: this.address
      }
      MeServer.postUpdateAddress(data).then((res: any) => {
        if(res.code == 200) {
          this.$toast(res.data)
          setTimeout(()=>{
            this.$router.go(-1);
          },200)
        }
      })
    }else{
      this.$toast(this.$i18n.t('noAddress'))
    }
  }
  public postAddress(){
    MeServer.postAddress().then((res: any) => {
      if(res.code == 200) {
        this.address = res.data.Address
        this.$store.dispatch('setAddressData',{
          data: res.data.Address
        })
      }
    })
  }
  
}
</script>

<style lang="scss" scoped>
.enter-box {
  padding: 0.3rem;
  background-color: #fff;
  .van-field {
    border: 0.02rem solid #ccc;
    border-radius: 0.05rem;
    min-height: 2rem;
  }
}
</style>