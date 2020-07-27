import VueRouter, {
	RouteConfig
} from 'vue-router';
import MeIndex from '@/views/me/Index.vue';
import ThirdAccount from '@/views/me/components/ThirdAccount.vue'
import Address from '@/views/me/components/Address.vue'
import Lang from '@/views/me/components/Lang.vue'
import Payment from '@/views/me/components/Payment.vue'
import MyOrder from '@/views/me/components/MyOrder.vue'
import PointsExchange from '@/views/me/components/PointsExchange.vue'

const routes: Array < RouteConfig > = [

	{
		path: '/meIndex',
		name: 'meIndex',
		component: MeIndex,
		children: []
    },
	{
		path: '/me/pointsexchange',
		name: 'pointsExchange',
		component: PointsExchange,
		children: []
    },
	{
		path: '/me/address',
		name: 'address',
		component: Address,
		children: []
    },
	{
		path: '/me/payment',
		name: 'payment',
		component: Payment,
		children: []
    },
	{
		path: '/me/myorder',
		name: 'myOrder',
		component: MyOrder,
		children: []
    },
	{
		path: '/me/lang',
		name: 'lang',
		component: Lang,
		children: []
    },
    {
        path: '/me/thirdaccount',
        name: 'thirdAccount',
        component: ThirdAccount
    },
	{
	    path: '/me/payment',
	    name: 'mePayment',
	    component: Payment
	}
]


export default routes
