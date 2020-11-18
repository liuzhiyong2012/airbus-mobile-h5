import VueRouter, {
	RouteConfig
} from 'vue-router';
import Game from '@/views/game/Index.vue';
import GameDetail from '@/views/game/GameDetail.vue';

const routes: Array < RouteConfig > = [
	{
		path: '/game',
		name: 'game',
		component: Game,
		meta: {
			keepAlive: false
		},
		children: []
	},
	{
		path: '/game/detail',
		name: 'gameDetail',
		component: GameDetail
	},
]


export default routes
