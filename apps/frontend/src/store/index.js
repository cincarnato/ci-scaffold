import Vue from 'vue'
import Vuex from 'vuex'
import {UserModuleStore} from '@ci-user-module/frontend'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user: UserModuleStore
    }
})