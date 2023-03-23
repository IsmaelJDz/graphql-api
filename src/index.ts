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
import { connectToMongo } from './utils/mongo';
import { verifyJwt } from './utils/jwt';
import { User } from './schema/user.schema';
import Context from './types/context';
import authChecker from './utils/authChecker';

async function bootstrap() {
  /** Build schema */

  const schema = await buildSchema({
    // resolvers: [__dirname + "/resolvers/**/*.ts"],
    resolvers,
    authChecker,
  });

  /** Init express */
  const app = express();

  app.use(cookieParser());
  /** Create apollo server */

  const server = new ApolloServer({
    schema,
    //context: ctx => ctx,
    context: (ctx: Context) => {
      // return {
      //   ...ctx,
      //   req: ctx.req,
      //   res: ctx.res,
      // };

      const context = ctx;

      if (ctx.req.cookies.accessToken) {
        const user = verifyJwt<User>(ctx.req.cookies.accessToken);

        context.user = user;
      }

      return context;
    },
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
              'request.credentials': 'include',
            },
          }),
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
  connectToMongo();
}

bootstrap();
