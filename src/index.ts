import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { resolvers } from './resolvers';

async function bootstrap() {
  /** Build schema */

  const schema = await buildSchema({
    // resolvers: [__dirname + "/resolvers/**/*.ts"],
    resolvers,
    //authChecker,
  });

  /** Init express */
  const app = express();

  app.use(cookieParser());

  /** Create apollo server */

  const server = new ApolloServer({
    schema,
    context: ctx => ctx,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  /** await server.start() */
  await server.start();

  /** apply middleware to server */
  server.applyMiddleware({ app });

  /** app.listen on express server */
  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });

  /** Connect to db */
}

bootstrap();
