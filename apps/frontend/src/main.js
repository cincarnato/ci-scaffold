import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import i18n from './i18n'
import router from "./router";

import apolloClient from './apollo'
import {setGraphQlClientToProviders} from '@ci-user-module/frontend'
setGraphQlClientToProviders(apolloClient)

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
