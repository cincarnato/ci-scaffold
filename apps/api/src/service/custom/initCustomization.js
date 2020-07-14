import {findCustomization,createCustomization} from '@ci-custom-module/api'

export const initCustomization = async function () {

    let customDoc = await findCustomization()

    if (!customDoc) {
        let customDoc = await createCustomization({
            colors: {
                primary: '#3F51B5',
                onPrimary: '#FFFFFF',
                secondary: '#1565C0',
                onSecondary: '#FFFFFF'
            },
            logo: {
                mode: 'Round',
                title: 'APP',
                filename: 'logo.png',
                url: process.env.APP_API_URL + '/media/logo/logo.png'
            },
            language: 'es'
        })
        console.log("Customization created: ", customDoc.id)
    } else {
        console.log("Customization found: ", customDoc.id)
    }

}