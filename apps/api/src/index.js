require('dotenv').config();
import express from 'express';
import './mongo-db'
import {ApolloServer, GraphQLExtension} from 'apollo-server-express'
import {resolvers, typeDefs} from './modules-merge'
import path from 'path'
import {jwtMiddleware, corsMiddleware, rbacMiddleware, sessionMiddleware} from '@ci-user-module/api'

import {expressRequestLogger, graphqlErrorLogger, graphqlResponseLogger} from './logger'

const app = express();

app.use(corsMiddleware)
app.use(express.json());
app.use(jwtMiddleware)
app.use(rbacMiddleware)
app.use(expressRequestLogger)
app.use(sessionMiddleware)


GraphQLExtension.didEncounterErrors

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return {user: req.user, rbac: req.rbac, req}
    },
    plugins: [
        {
            requestDidStart(requestContext) {
                return {
                    didEncounterErrors(requestContext) {
                        graphqlErrorLogger(requestContext)
                    },
                    willSendResponse(requestContext){
                        graphqlResponseLogger(requestContext)
                    }
                }
            }
        }
    ]
});



apolloServer.applyMiddleware({app})

//STATIC IMG
app.use('/media/avatar', express.static('media/avatar'));
app.use('/media/logo', express.static('media/logo'));
app.use('/media/export', express.static('media/export'));
app.use('/', express.static('web',{index: "index.html"}));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'web/index.html'));
});

//status
app.get('/status', function(req,res){res.send("RUNNING")})

app.listen(process.env.APP_PORT, () => console.log(`Server started :). URL: http://localhost:${process.env.APP_PORT}${apolloServer.graphqlPath}`))
