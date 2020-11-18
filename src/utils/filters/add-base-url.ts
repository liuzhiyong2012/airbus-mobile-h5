import {Vue} from 'vue-property-decorator';
import  UrlUtils from '../url-utils';

let filter = {
	name:'addBaseUrl',
	handler:function(url:any){
		if (!url) return url;
		
		url = UrlUtils.delBaseUrl(url);
		
		if (url.indexOf('https://') < 0 && url.indexOf('http://') < 0 && url.indexOf('data:image') < 0) {
			let baseUrl = process.env.VUE_APP_STATIC_URL;
			url = `${baseUrl}/${url}`
		}
		return url
	}
}

export default filter;

