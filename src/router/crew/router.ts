import VueRouter, { RouteConfig } from 'vue-router';
import CrewLogin from '../../views/crew/Login.vue';
import CrewIndex from '../../views/crew/Index.vue';

import CrewCatering from '../../views/crew/CrewCatering.vue';
import CrewDataPackage from '../../views/crew/CrewDataPackage.vue';
import CrewGoods from '../../views/crew/CrewGoods.vue';
import CrewIncomeStatistics from '../../views/crew/CrewIncomeStatistics.vue';
import CrewCabinLayout from '../../views/crew/CrewCabinLayout.vue';
import CrewChat from '../../views/crew/CrewChat.vue';



/* let PersonCenter = (resolve) => {
	return require.ensure([], () => {
		resolve(require('@/pages/PersonCenter/personCenter'))
	}, 'personCenter')
} */
// http://localhost:8888/crew.html#/crew/catering


const routes: Array<RouteConfig> = [
	{
		path: '/crew/login',
		name: 'crewLogin',
		component: CrewLogin,
		children: []
	},
	{
		path: '/crew/index',
		name: 'crewIndex',
		component: CrewIndex,
		children: [{
			path:'/cater',
			name:'crewCatering',
			component:CrewCatering
		},
		{
			path:'/crew/datapackage',
			name:'crewDataPackage',  
			component:CrewDataPackage
		},
		{
			path:'/crew/goods',
			name:'crewGoods',
			component:CrewGoods
		},
		{
			path:'/crew/incomestatistics',
			name:'crewIncomeStatistics',
			component:CrewIncomeStatistics
		},
		{
			path:'/crew/cabinlayout',
			name:'crewCabinLayout',
			component:CrewCabinLayout
		},
		{
			path:'/crew/chat',
			name:'crewChat',
			component:CrewChat
		}]
	}
];

export default routes;
