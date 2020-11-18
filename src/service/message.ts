import request, { request as http } from "@/utils/request";
import { AxiosPromise } from "axios";

export default class MessageService {
  constructor() {}

  // 用户给空乘发送消息
  static sendToManager(data?: Object) {
    return request({
      url: "/v1/api/Message/SendToManager",
      method: "POST",
      data: data,
    });
  }
  // 空乘给用户发送消息
  static sendToUser(data?: Object) {
    return request({
      url: "/v1/api/Message/SendToUser",
      method: "POST",
      data: data,
    });
  }
  
  
  // 用户当前航班的消息 传参 read 0未读  1已读 
  static getUserMessage(data?: Object) {
    return request({
      url: "/v1/api/Message/getUserMessage",
      method: "POST",
      data: data,
    });
  }

  // 消息已读 将消息从未读改为已读
  static changeReadMessage(data?: Object) {
    return request({
      url: "/v1/api/Message/ReadMessage",
      method: "POST",
      data: data,
    });
  }


  // 系统通知 传参 read 0未读  1已读
  static getSystemNoticeList(data?: Object) {
    return request({
      url: "/v1/api/notice/List",
      method: "POST",
      data: data,
    });
  }

   // 通知已读 将通知从未读改为已读
   static changeReadNotice(data?: Object) {
    return request({
      url: "/v1/api/notice/ReadNotice",
      method: "POST",
      data: data,
    });
  }
  

}
