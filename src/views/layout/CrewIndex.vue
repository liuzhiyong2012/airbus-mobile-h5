<template>
  <section class="abus-layout-ctn">
    <section class="abus-layout-main-ctn">
      <router-view class="abus-layout-view-ctn" />
    </section>
  </section>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "LayoutIndex",
  components: {},
})
export default class LayoutIndex extends Vue {
  @Prop() private msg!: string;

  private created(): void {}
  
}
</script>


<style lang="scss">
@import "../../assets/style/index.scss";

.abus-layout-ctn {
}
</style>