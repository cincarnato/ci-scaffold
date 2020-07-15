import dotenv from 'dotenv'
dotenv.config()

import initService from "./service/init-service";


initService().then(()=>{
    process.exit()
})