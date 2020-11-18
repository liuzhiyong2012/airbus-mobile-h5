<template>
  <section>
    <div class="about-us">
      <div class="s-imgbox">
        <div class="img">
          <img :src="aboutUs.img" :alt="aboutUs.name" width="100%" />
        </div>
        <div class="cover"></div>
        <p class="s-name">{{ aboutUs.name }}</p>
        <p class="s-tips">{{ aboutUs.tips }}</p>
        <p class="s-in-btn"  @click="gotoDetail">
            <img src="./../images/home_aboutus_arrow.png" alt="">
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      aboutUs: {
        img: require("./../images/home_aboutus2.png"),
        name: "We Are Airbus",
        tips: "WE MAKE IT FLY!",
      },
    };
  },

  methods: {
    gotoDetail() {
      this.$router.push({
        name: "aboutUs"
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.about-us {
  margin: 0 0.28rem;
  background-color: #fff;
  min-height: 2.4rem;
  border-radius: 0.1rem;
  box-shadow: 0 0 0.1rem #efefef;

  .s-imgbox {
    position: relative;
    .img {
      width: 100%;
      box-shadow: 0 0 0.08rem #efefef;
      img {
        border-radius: 0.1rem;
      }
    }
    .cover {
      position: absolute;
      width: 100%;
      height: 1rem;
      bottom: 0.02rem;
      left: 0;
      border-radius: 0 0 0.1rem 0.1rem;
      background-color: #00205b;
      opacity: 0.4;
    }

    .s-name {
      position: absolute;
      bottom: 0.56rem;
      left: 0;
      margin-left: 0.2rem;
      height: 0.34rem;
      line-height: 0.34rem;
      font-size: 0.28rem;
      font-weight: bold;
      color: #fff;
      text-shadow: 0px 2px 4px rgba(15, 35, 61, 0.14);
    }
    .s-tips {
      position: absolute;
      bottom: 0.22rem;
      left: 0;
      margin-left: 0.2rem;
      height: 0.22rem;
      line-height: 0.22rem;
      font-size: 0.2rem;
      font-family: PingFangSC-Regular, PingFang SC;
      color: rgba(208, 217, 224, 1);
    }
    .s-in-btn {
      position: absolute;
      bottom: 0.18rem;
      right: 0.25rem;
      img{
          width: .6rem;
      }
    }
  }
}
</style>