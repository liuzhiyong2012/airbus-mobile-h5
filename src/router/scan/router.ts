import VueRouter, {
	RouteConfig
} from 'vue-router';
import ScanIndex from '../../views/scan/Index.vue';



/* let PersonCenter = (resolve) => {
	return require.ensure([], () => {
		resolve(require('@/pages/PersonCenter/personCenter'))
	}, 'personCenter')
} */
// http://localhost:8888/crew.html#/crew/catering


const routes: Array<RouteConfig> = [
	{
		path: '/scan',
		name: 'scan',
		component: ScanIndex,
		children: []
	}
];

export default routes;
