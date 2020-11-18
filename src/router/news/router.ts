import VueRouter, {
	RouteConfig
} from 'vue-router';
import News from '@/views/news/Index.vue';
import NewsDetail from '@/views/news/NewsDetail.vue';

const routes: Array < RouteConfig > = [
	{
		path: '/news',
		name: 'news',
		component: News,
		meta: {
			keepAlive: false
		},
		children: []
	},
	{
		path: '/news/detail',
		name: 'newsDetail',
		component: NewsDetail,
		meta: {
			keepAlive: false
		}
	},
]


export default routes
