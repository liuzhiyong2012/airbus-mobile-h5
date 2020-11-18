import {Vue} from 'vue-property-decorator';

export default {
  addBaseUrl:function(url:string){
	  if (!url) return url;
	  
	  if (url.indexOf('https://') < 0 && url.indexOf('http://') < 0 && url.indexOf('data:image') < 0) {
	  	let baseUrl = process.env.VUE_APP_STATIC_URL;
	  	url = `${baseUrl}/${url}`
	  }
	  
	  return url;
  },
  delBaseUrl:function(url:string){
  	  if (!url) return url;
  	  
  	  let index = url.lastIndexOf('/');
	  
	  let ret = url.slice(index + 1);
  	  
  	  return ret;
  	  
  	  // return url;
  }
  
}
