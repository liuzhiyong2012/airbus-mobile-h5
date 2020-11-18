<template>
    <div class="abus-height">
        <abus-title :title="$t('title')" backRouteName="meIndex"></abus-title>
        <van-tabs
                class="f1"
                line-width="20"
                line-height="4"
                color="rgb(0,32,91)"
                title-active-color="rgb(0,32,91)"
                sticky
        >
            <van-tab v-for="(item,index) in tabData" :title="$t(item)" :key="index">
                <div v-if="item == 'Dish'" class>
                    <my-dish-order></my-dish-order>
                </div>
                <div v-else-if="item == 'Shopping'" class><my-shopping-order></my-shopping-order></div>
                <div v-else-if="item == 'Internet'" class><my-internet-order></my-internet-order></div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<i18n>
    {
    "zh":{
    "title":"我的订单",
    "Dish": "餐品",
    "Shopping": "机上购物",
    "Internet": "网络"
    },
    "en":{
    "title":"My order",
    "Dish": "Dish",
    "Shopping": "Shopping",
    "Internet": "Internet"
    }
    }
</i18n>
<script>
    import MyDishOrder from "./MyDishOrder";
    import MyShoppingOrder from "./MyShoppingOrder";
    import MyInternetOrder from "./MyInternetOrder";
    import AbusTitle from "../../../components/AbusTitle.vue";
    export default {
        components: {
            MyDishOrder,
            MyShoppingOrder,
            MyInternetOrder,
            AbusTitle
        },
        data() {
            return {
                tabData: ["Dish", "Shopping", "Internet"],
            };
        },
        mounted() {
            if (localStorage.getItem("lang") == "en") {
                this.$i18n.locale = "en";
            } else {
                this.$i18n.locale = "zh";
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import '../../../assets/style/index.scss';

    @media  (orientation:portrait) {
        .f1{
            /deep/ .van-tab{
                line-height: 0.4rem;
            }
        }
    }

    @media  (orientation:landscape) {
        .f1{
            /deep/ .van-tab{
                line-height: 0.4rem;
            }
        }
    }
</style>