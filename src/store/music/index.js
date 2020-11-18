import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'


export default {
  getters:getters,
  state: state,
  mutations:mutations,
  actions: actions
}
