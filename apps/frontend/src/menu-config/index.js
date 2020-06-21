import i18n from "../i18n";
export default [
    {
        icon: 'home',
        text: i18n.t('base.home'),
        link: { name: "home" },
        panel: false
    },
    {
        icon: 'perm_phone_msg',
        text: i18n.t('base.about'),
        link: { name: "about" },
        panel: false,
    },
    {
        icon: 'person',
        text: 'Administrador',
        panel: false,
        permission: 'SECURITY_USER_SHOW',
        children: [
            {
                icon: 'assignment_ind',
                text: 'Dashboard',
                link: { name: "userDashboard" },
                panel: false,
                permission: 'SECURITY_DASHBOARD_SHOW'
            },
            {
                icon: 'assignment_ind',
                text: i18n.t('user.title'),
                link: { name: "usersAdmin" },
                panel: false,
                permission: 'SECURITY_USER_SHOW'
            },
            {
                icon: 'verified_user',
                text: i18n.t('role.title'),
                link: { name: "rolesAdmin" },
                panel: false,
                permission: 'SECURITY_ROLE_SHOW'
            },
            {
                icon: 'group',
                text: i18n.t('group.title'),
                link: { name: "groupsAdmin" },
                panel: false,
                permission: 'SECURITY_GROUP_SHOW'
            },

        ]
    }


]
