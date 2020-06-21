import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas';
import {api} from 'ci-user-module'

//RESOLVERS
import {resolvers as customizationResolvers } from './modules/customization/graphql'

export const resolvers = mergeResolvers([api.securityResolvers, customizationResolvers])

//TYPEDEFS
import {types as customizationTypes} from './modules/customization/graphql'

export const typeDefs = mergeTypes([api.securityTypes, customizationTypes])
