import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas';
import {securityResolvers,securityTypes} from '@ci-user-module/api'
import {types as customTypes,resolvers as customResolvers} from '@ci-custom-module/api'

//BASE RESOLVERS
import {resolvers as baseResolvers } from './modules/base/graphql'
//BASE TYPEDEFS
import {types as baseTypes} from './modules/base/graphql'


export const resolvers = mergeResolvers([
    baseResolvers,
    securityResolvers,
    customResolvers
])

export const typeDefs = mergeTypes([
    baseTypes,
    securityTypes,
    customTypes
])
