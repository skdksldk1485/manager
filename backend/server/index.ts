import './env';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import createSchema from '../schema';
import createSession from '../session';
import nextApp from '@life/frontend';

const port = process.env.PORT || 8000;
const handle = nextApp.getRequestHandler();

async function createServer() {
  try {
    // 1. create mongoose connection
    await createSession();
    // 2. create express server
    const app = express();

    // allow CORS from client app
    const corsOptions = {
      credentials: true,
    };
    app.use(cors(corsOptions));

    // allow JSON requests (bodyparser)
    app.use(express.json());

    const schema = await createSchema();

    // 3. create GraphQL server
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      // enable GraphQL Playground with credentials
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    // 4. create next client request handler
    // prepare the next app
    await nextApp.prepare();
    app.get('*', (req, res) => handle(req, res));

    // 5. start the server
    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

createServer();
