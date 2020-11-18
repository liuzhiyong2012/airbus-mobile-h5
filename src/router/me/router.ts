import VueRouter, {
	RouteConfig
} from 'vue-router';
import Me from '@/views/me/Index.vue';
import ThirdAccount from '@/views/me/components/ThirdAccount.vue'
import Address from '@/views/me/components/Address.vue'
import Payment from '@/views/me/components/Payment.vue'
import Lang from '@/views/me/components/Lang.vue'
import MyOrder from '@/views/me/components/MyOrder.vue'
import PointsExchange from '@/views/me/components/PointsExchange.vue'
import PointsDetails from '@/views/me/components/PointsDetails.vue'
import PointsCart from '@/views/me/components/PointsCart.vue'

import PrivacyPolicy from '@/views/me/components/PrivacyPolicy.vue'
import TermsOfService from '@/views/me/components/TermsOfService.vue'


const routes: Array<RouteConfig> = [
	{
		path: '/me',
		name: 'meIndex',
		component: Me,
		meta: {
			keepAlive: false
		},
		children: []
	},
	{
		path: '/address',
		name: 'address',
		component: Address,
		meta: {
			keepAlive: false
		},
		children: []
	},
	{
		path: '/my/order',
		name: 'myOrder',
		component: MyOrder,
		meta: {
			keepAlive: false
		},
		children: []
	},
	{
		path: '/lang',
		name: 'lang',
		component: Lang,
		meta: {
			keepAlive: false
		},
		children: []
	},
	{
		path: '/third/account',
		name: 'thirdAccount',
		meta: {
			keepAlive: false
		},
		component: ThirdAccount
	},
	{
		path: '/me/payment',
		name: 'payment',
		meta: {
			keepAlive: false
		},
		component: Payment
	},
	{
		path: '/me/privacypolicy',
		name: 'privacyPolicy',
		meta: {
			noRequireAuth:true,
			keepAlive: false
		},
		component: PrivacyPolicy
	},
	{
		path: '/me/termOfService',
		name: 'termsOfService',
		meta: {
			noRequireAuth:true,
			keepAlive: false
		},
		component: TermsOfService
	},
	{
		path: '/me/pointsexchange',
		name: 'pointsExchange',
		meta: {
			keepAlive: false
		},
		component: PointsExchange,
		children: []
	},
	{
		path: '/me/pointsdetails',
		name: 'pointsDetails',
		meta: {
			keepAlive: false
		},
		component: PointsDetails,
		children: []
	},
	{
		path: '/me/pointscart',
		name: 'pointsCart',
		component: PointsCart,
		children: []
	},
]


export default routes
