import VueRouter, {
    RouteConfig
} from 'vue-router';
import Shopping from '../../views/shopping/Index.vue';
import ShoppingDetails from '../../views/shopping/ShoppingDetails.vue';
import ShoppingCart from '../../views/shopping/ShoppingCart.vue';
import ShoppingSearch from '../../views/shopping/components/ShoppingSearch.vue';


const routes: Array<RouteConfig> = [
    {
        path: '/shopping',
        name: 'shopping',
        component: Shopping,
        meta: {
			keepAlive: false
		},
        children: []
    },
    {
        path: '/shopping/details',
        name: 'shoppingDetails',
        component: ShoppingDetails,
        meta: {
			keepAlive: false
		}
    },
    {
        path: '/shopping/cart',
        name: 'shoppingCart',
        meta: {
			keepAlive: false
		},
        component: ShoppingCart
    },
    {
        path: '/shopping/search',
        name: 'shoppingSearch',
        meta: {
			keepAlive: false
		},
        component: ShoppingSearch
    }

]

export default routes
