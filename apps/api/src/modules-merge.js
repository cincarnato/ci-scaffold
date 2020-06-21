import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas';
import {securityResolvers,securityTypes} from '@ci-user-module/api'

//RESOLVERS
import {resolvers as customizationResolvers } from './modules/customization/graphql'

export const resolvers = mergeResolvers([securityResolvers, customizationResolvers])

//TYPEDEFS
import {types as customizationTypes} from './modules/customization/graphql'

export const typeDefs = mergeTypes([securityTypes, customizationTypes])
