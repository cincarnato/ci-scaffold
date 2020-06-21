import baseProvider from "../providers/BaseProvider";

export default {
    state: {
        title: "App Name",
        serverStatus: false,
        serverTime: null,
        serverError: null
    },
    getters: {
        getTitle: (state) => {
            return state.title
        },
        getServerStatus: (state) => {
            return state.serverStatus
        }
    },
    actions: {
        ping({commit}) {
            let begin = Date.now()
            baseProvider.ping().then(r => {
                let time = begin - Date.now()
                commit('setServerStatus', r.data.status)
                commit('setServerTime', time)

            }).catch(e => {
                commit('setServerStatus', false)
                commit('setServerTime', 0)
                commit('setServerError', e.message)
            })
        }
    },
    mutations: {
        setServerStatus(state, status) {
            state.serverStatus = status
        },
        setServerTime(state, time) {
            state.serverTime = time
        },
        setServerError(state, error) {
            state.serverError = error
        }
    }
}