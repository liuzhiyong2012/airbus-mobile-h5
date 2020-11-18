<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item class="van_swipe_item" v-for="(item, index) in bannerData" :key="index">
        <img v-if='item.img' class="img" :src="item.img |addBaseUrl" @click="stepTo(item)" alt="game image" />
        <span v-else @click="stepTo(item)">
          <van-empty image="network" description="" />
        </span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

export default {
  props: ["bannerData"],
  data() {
    return {
    };
  },
  methods: {
   stepTo(item){
			this.$emit('stepTo',item);
		}
  }
};
</script>

<style lang="scss" scoped>
.van_swipe_item {
  .img {
    display: block;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
  }
}
</style>