import VueRouter, { RouteConfig } from 'vue-router';
import DishIndex from '../../views/dish/Index.vue';
import DishDetail from '../../views/dish/DishDetail.vue';

import DishCart from '../../views/dish/DishCart.vue';

/* let PersonCenter = (resolve) => {
	return require.ensure([], () => {
		resolve(require('@/pages/PersonCenter/personCenter'))
	}, 'personCenter')
} */

const routes: Array<RouteConfig> = [
	{
		path: '/dish/index',
		name: 'dishIndex',
		component: DishIndex,
		meta: {
			keepAlive: false
		},
		children: []
	},
	{
		path: '/dish/detail',
		name: 'dishDetail',
		component: DishDetail,
		meta: {
			keepAlive: false
		},
		children: []
	},
	{
		path: '/dish/cart',
		name: 'dishCart',
		component: DishCart,
		meta: {
			keepAlive: false
		},
		children: []
	}
];

export default routes;
