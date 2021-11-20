import 'reflect-metadata';
import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import router from './api/api';

const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');


const main = async () => {
    const app = new Koa();
    var CorsOptions = {
        orgin: '*'
      };
    app.use(cors(CorsOptions));
    app.use(router.routes())
    app.use(bodyParser({multipart: true}))

    const schema = await buildSchema({
        resolvers: [
            breachesResolver
        ]
    })

    const server = new ApolloServer({
        playground: true,
        schema
    })

    server.applyMiddleware({ app, path: '/graphql' });
    app.listen({ port: 4000 }, async () => {
        createConnection().then(() => { 
        console.log(`GraphQL is now running on http://localhost:4000/graphql`);
      });
    });
}

main();