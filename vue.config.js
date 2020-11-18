const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
  
const baseUrl = '/';
const vConsolePlugin = require('vconsole-webpack-plugin');
module.exports = {
	pages: {//配置多页面入口        
	      crew: {          
	        entry: 'src/crew.ts',
	        template: 'public/crew.html',   
			filename: 'crew.html',
			chunks: ['chunk-vendors', 'chunk-common', 'crew']
	      },        
	      index: {          
	        entry: 'src/main.ts',          
	        template: 'public/index.html', 
			filename: 'index.html',
			chunks: ['chunk-vendors', 'chunk-common', 'index']
	      }
	 },
    configureWebpack: {
		devtool: 'source-map'
    },
	/* configureWebpack: config => {
	   		 //生产环境去掉vconsole调试器
	    	let envType = process.env.NODE_ENV != 'production';
	    	let pluginsDev = [
	     		 new vConsolePlugin({
	       			 filter: [],
	      		 	 enable: true
	     		 })
	    	];
	
	    	config.plugins = [...config.plugins, ...pluginsDev];
	   	}, */
    productionSourceMap: false,
    // publicPath: '/', //开发
	publicPath: process.env.VUE_APP_PUBLIC_PATH, //打包
    devServer: {
		// https:true,
        port: process.env.VUE_APP_PORT,
        proxy: {
			//项目图片映射  
            '/abusimg': {
              target: process.env.VUE_APP_STATIC_URL,//后端接口地址
              changeOrigin: true,//是否允许跨越
              pathRewrite: {
                '^/abusimg': '',//重写,
              }
            },
			//地图图片映射
            '/mapimg': {
                target: process.env.VUE_APP_MAP_URL,
                changeOrigin: true,
                secure: false,
				pathRewrite: {
				  '^/mapimg': '',//重写,
				}
            },
			//接口请求地址映射
            /* '/': {
                target: process.env.VUE_APP_BASE_URL,
                changeOrigin: true,
                secure: false,
            }, */
        },
        before(app) {
			const base = baseUrl.replace(/\/+$/, ''); // 移除尾部斜杠          
					app.get(`${base}/:page/*`, function(req, res, next) {            
					if (['crew', 'index'].includes(req.params.page)) {
					req.url = `${base}/${req.params.page}/`;              
					next('route');            
					} else {
						next();            
					}          
				});    
        }
    },
	lintOnSave: false,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
            ]
        }
    },
	css: {
	    loaderOptions: {
	      postcss: {
	        plugins: [
	          autoprefixer({
	            browsers: ['Android >= 4.0', 'iOS >= 7']
	          }),
	          pxtorem({
	            rootValue: 100, //37.5,
	            propList: ['*'],
	          })
	        ]
	      }
	    }
	  },
	chainWebpack: config => {
	    config.module
	      .rule('i18n')
	      .resourceQuery(/blockType=i18n/)
	      .type('javascript/auto')
	      .use('i18n')
	        .loader('@kazupon/vue-i18n-loader')
	        .end();
	  }
};