import Vue from 'vue'
import Vuex from 'vuex'
import {UserModuleStore} from '@ci-user-module/frontend'

Vue.use(Vuex)

import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
    modules:{
        user: UserModuleStore
    },
    plugins: [
        createPersistedState({
            key: process.env.VUE_APP_KEY,
            paths: ['user'],
            reducer: state => (
                {
                    user: {
                        access_token: state.user.access_token,
                        me: state.user.me
                    },

                })
        })
    ]
})