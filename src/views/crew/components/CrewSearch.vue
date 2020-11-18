<template>
  <div class="crew-search">
    <input type="text" v-model="searchWord" :placeholder="$t('searchText')" />
    <button @click="search()">{{ $t("search") }}</button>
  </div>
</template>
<i18n>
	{
		"zh":{
			"search":"搜索",
			"searchText":"根据座位号搜索"
		},
		"en":{
			"search":"search",
			"searchText":"Search for seat number"
		}
	}
</i18n>
<script lang = "ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "CrewSearch",
  components: {},
})
export default class CrewSearch extends Vue {
  private searchWord: string = "";
  public created() {
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  }
  private search() {
    this.$emit("search", this.searchWord);
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 100px * 1rem; //100px为根字体大小
}

.crew-search {
  display: flex;
  width: rem(570px);
  justify-content: space-between;

  > input {
    box-sizing: border-box;
    width: rem(398px);
    height: rem(76px);
    border-radius: rem(20px);
    border: rem(4px) solid rgba(175, 213, 253, 1);
    line-height: rem(68px);
    padding: 0 rem(24px);

    font-size: rem(28px);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: transparent;
  }

  > button {
    width: rem(150px);
    height: rem(76px);
    border-radius: rem(20px);
    border: rem(4px) solid rgba(175, 213, 253, 1);

    line-height: rem(68px);
    padding: 0 rem(24px);

    text-align: center;
    font-size: rem(28px);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: transparent;
  }
}
</style>

