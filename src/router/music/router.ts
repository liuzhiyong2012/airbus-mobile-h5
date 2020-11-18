import VueRouter, {
	RouteConfig
} from 'vue-router';
import MusicIndex from '../../views/music/Index.vue';
import MusicFavourites from '../../views/music/MusicFavourites.vue';
import MusicAirFm from '../../views/music/MusicAirFm.vue';
import MusicTopRanks from '../../views/music/MusicTopRanks.vue';
import MusicPlaylistDetail from '../../views/music/MusicPlaylistDetail.vue';

const routes: Array < RouteConfig > = [
	{
		name:'musicIndex',
		path:'/music/index',
		component:MusicIndex,
		meta: {
			keepAlive: false
		},
		children:[]
	},
	{
		name:'musicFavourites',
		path:'/music/index',
		component:MusicFavourites,
		meta: {
			keepAlive: false
		},
		children:[]
	},
	{
		name:'musicAirFm',
		path:'/music/airfm',
		component:MusicAirFm,
		meta: {
			keepAlive: false
		},
		children:[]
	},
	{
		name:'musicTopRanks',
		path:'/music/topranks',
		component:MusicTopRanks,
		meta: {
			keepAlive: false
		},
		children:[]
	},
	{
		name:'musicPlaylistDetail',
		path:'/music/playlist/detail',
		component:MusicPlaylistDetail,
		meta: {
			keepAlive: false
		},
		children:[]
	}
]

export default routes
