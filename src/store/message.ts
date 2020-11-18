import { localStore } from "@/utils/data-management";
export default {
  state: {
    chatList: [], // 聊天记录列表
    noticeList: [], // 系统通知列表
  },
  mutations: {
    addChatList(state: any, data: any) {
      state.chatList = [];
      state.chatList = data;
      localStore.set("chatList", data);
    },
    addNoticeList(state: any, data: any) {
      state.noticeList = [];
      state.noticeList = data;
      localStore.set("noticeList", data);
    },
  },
  actions: {
    saveChatList(context: any, state: any) {
      context.commit("addChatList", state);
    },
    saveNoticeList(context: any, state: any) {
      context.commit("addNoticeList", state);
    },
  },
};
