import VueRouter, {
    RouteConfig
} from 'vue-router';
import Video from '../../views/video/Index.vue';
import VideoPlay from '../../views/video/Play.vue';
import LikePlay from '../../views/video/LikePlay.vue';
import Comment from '../../views/video/components/Comment.vue';


const routes: Array<RouteConfig> = [
    {
        path: '/video',
        name: 'video',
        component: Video,
        meta: {
			keepAlive: false
		},
        children: []
    },
    {
        path: '/video/play',
        name: 'videoPlay',
        meta: {
			keepAlive: false
		},
        component: VideoPlay
    },
    {
        path: '/video/play2',
        name: 'likePlay',
        meta: {
			keepAlive: false
		},
        component: LikePlay
    },
    {
        path: '/video/comment',
        name: 'Comment',
        meta: {
			keepAlive: false
		},
        component: Comment
    }

]

export default routes
