import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import UserResolver from "./resolvers/UserResolver";

const buildGraphQLServer = async (app: any) => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  apolloServer.applyMiddleware({ app });
};

export default buildGraphQLServer;
