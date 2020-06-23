<template>
    <v-app>
        <layout :menu="menu">
            <template v-slot:toolbar-left>
                <logo-toolbar></logo-toolbar>
                <title-toolbar></title-toolbar>
            </template>

            <template v-slot:toolbar-right>
                <dashboard-button />
                <app-bar-user-menu />
            </template>


            <router-view></router-view>
        </layout>
    </v-app>
</template>

<script>

    import Layout from "./layout/Layout";
    import menuConfig from './menu-config'
    import {DashboardButton, AppBarUserMenu} from '@ci-user-module/frontend'
    import {LogoToolbar,TitleToolbar} from '@ci-custom-module/frontend'

    export default {
        name: 'App',
        components: {Layout,DashboardButton,AppBarUserMenu,LogoToolbar,TitleToolbar},
        data(){
            return {
                menu: menuConfig
            }
        }
    };
</script>
