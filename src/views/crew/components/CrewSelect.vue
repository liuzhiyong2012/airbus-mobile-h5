<template>
  <section class="crew-select">
    <div class="select-value-ctn" @click="isShowed = !isShowed">
      <span>{{ selectLabel }}</span>

      <i class="icon icon-caret"> </i>
    </div>

    <div class="dropdown-ctn" v-show="isShowed">
      <div
        class="dropdown-item"
        v-for="(item, index) in selectList"
        :key="index"
        @click="select(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </section>
</template>
<i18n>
	{
		"zh":{
		},
		"en":{
		}
	}
</i18n>
<script lang = "ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "CrewTab",
  components: {},
})
export default class CrewTab extends Vue {
  @Prop({
    default: () => {
      return [];
    },
  })
  selectList: Array<any>;

  @Prop({
    default: () => {
      return "";
    },
  })
  private selectValue;

  private isShowed: boolean = false;

  private docClickHandle: any = () => {};

  private change($event): void {
    this.$emit("valueChange", $event.value);
  }

  private get selectLabel(): string {
    let label = "未知";
    this.selectList.forEach((item, index) => {
      if (this.selectValue == item.value) {
        label = item.name;
      }
    });
    return label;
  }

  private created() {
    this.docClickHandle = (e) => {
      let event = e || window.event;
      let eventEle = this.closest(event.target, ".crew-select");
      if (!eventEle) {
        this.isShowed = false;
      }
    };

    document.addEventListener("click", this.docClickHandle);
  }

  private beforeDestroy() {
    document.removeEventListener("click", this.docClickHandle);
  }

  private closest(el, selector) {
    var matchesSelector =
      el.matches ||
      el.webkitMatchesSelector ||
      el.mozMatchesSelector ||
      el.msMatchesSelector;

    while (el) {
      if (matchesSelector.call(el, selector)) {
        break;
      }
      el = el.parentElement;
    }
    return el;
  }

  private select(item): void {
    // select
    this.isShowed = false;
    this.$emit("select", item);
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 100px * 1rem; //100px为根字体大小
}

.crew-select {
  position: relative;
  width: rem(288px);
  height: rem(76px);

  border-radius: rem(20px);
  border: rem(4px) solid rgba(175, 213, 253, 1);

  .select-value-ctn {
    width: 100%;
    height: 100%;
    padding: 0 rem(56px) 0 rem(40px);
    white-space: nowrap;
    line-height: rem(66px);

    font-size: rem(28px);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    overflow: hidden;
    text-overflow: ellipsis;

    > span {
    }

    > .icon {
      position: absolute;
      top: rem(26px);
      right: rem(20px);
      font-size: rem(24px);
      line-height: rem(24px);
    }
  }
  .dropdown-ctn {
    position: absolute;
    left: 0;
    width: 100%;
    top: 100%;
    margin-top: rem(10px);

    background: rgba(0, 36, 104, 0.96);
    border-radius: rem(20px);
    border: rem(4px) solid rgba(175, 213, 253, 1);
    padding: 0 rem(30px);
    box-sizing: border-box;

    .dropdown-item {
      &:not(:last-child) {
        border-bottom: rem(1px) solid #afd5fd;
      }

      padding: rem(24px) rem(10px);
      font-size: rem(28px);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: rem(28px);
    }
  }
}
</style>

