import { localStore } from '@/utils/data-management';
import { AxiosResponseForZCT, ZCTAPI } from '@/utils/types';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Vue from 'vue';
// import { Message } from 'element-ui'
// 验签---------------
import md5 from 'js-md5'
import StringUtils from './stringUtils'

// AxiosError 只有 message， 接口返回 msg， 故此扩展一下
interface customError extends AxiosError {
  msg: string
}



const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL, 
  timeout: 10000,
  withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
	  const authorToken = localStore.get('token');
    const airbusId = localStore.get('airbusId')
    const timestamp = new Date().getTime() + ''
    const nonce = StringUtils.randomStr(32)
    const ZCT_SECRET = '21fa6sd1f95w1133edsafas6';
	
    const encrptString = `${timestamp}.${ZCT_SECRET}.${nonce}`
    const sign = md5(encrptString)
    config.headers = {
      ...config.headers, //@temp
      sign,
      timestamp,
      nonce,
      Authorization: authorToken,
      AirBus: airbusId
    }
    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response:any) => {
	  // AxiosResponse<ZCTAPI.Res>
    /**
     * TODO: 补充服务端状态码规范
     */
	  //状态编码
    if (response.status === 200&&(!response.data.error)&&response.data.code=="200") {
       return response.data;
    } else if(response.status === 200&&(!response.data.error)&&response.data.code=="401"){
		//当token失效跳转登录页面
		let host = (Vue.config as any).host; 
		
		if(!host.$route.meta.noRequireAuth){
			host.$router.push('/login');
		}
		//跳转到登录页面。
	}else{
      // Message.error(response.data.message || '网络错误')
      return Promise.reject(response.data)
    }
  },
  (error: customError) => {
    const { data } = error.response as any
    const res = data as AxiosResponseForZCT
    // Message({
    //   message: error.msg || res.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
export function request<T>(params: object): Promise<T> {
  return service(params) as any
}
