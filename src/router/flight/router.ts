import VueRouter, {
	RouteConfig
} from 'vue-router';
import FlightIndex from '../../views/flight/Index.vue';


/* let PersonCenter = (resolve) => {
	return require.ensure([], () => {
		resolve(require('@/pages/PersonCenter/personCenter'))
	}, 'personCenter')
} */
const routes: Array < RouteConfig > = [{
	path: '/flight/index',
	name: 'flightIndex',
	component: FlightIndex,
	meta: {
		keepAlive: false
	},
	children: []
}]

export default routes
