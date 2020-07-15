import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useCreateIndex', true)

import {InitService} from '@ci-user-module/api'
import {initPermissionsCustomization} from '@ci-custom-module/api'
import {initCustomization} from './custom/initCustomization'
import operatorRole from './custom/initOperatorRole'

const initService = async () => {
    await InitService.initPermissions()
    await initPermissionsCustomization()
    await InitService.initAdminRole()
    await InitService.initRoles([operatorRole])
    await InitService.initRootUser()
    await initCustomization()
    console.log("Done")
}

export {initService}

export default initService
