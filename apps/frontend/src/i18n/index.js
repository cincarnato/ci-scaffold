import Vue from "vue";
import VueI18n from 'vue-i18n'
import merge from 'deepmerge'

import baseMessages from '../modules/base/i18n/messages'
import {i18nMessages as i18nMessagesCommon} from '@ci-common-module/frontend'
import {i18nMessages as i18nMessagesUser} from '@ci-user-module/frontend'
import {i18nMessages as i18nMessagesCustom} from '@ci-custom-module/frontend'

const messages = merge.all([
    baseMessages,
    i18nMessagesCommon,
    i18nMessagesUser,
    i18nMessagesCustom
])

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'en',
    messages,
})

export default i18n