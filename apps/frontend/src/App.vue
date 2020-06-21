<template>
    <v-app>
        <layout :menu="menu">
            <template v-slot:toolbar-left>
                a
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

    export default {
        name: 'App',
        components: {Layout,DashboardButton,AppBarUserMenu},
        data(){
            return {
                menu: menuConfig
            }
        }
    };
</script>
