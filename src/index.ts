import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema, Query, Resolver } from 'type-graphql';

@Resolver()
class HelloResolver {
  @Query(() => String, {
    name: 'helloWorld',
    defaultValue: 'hello world default edtion ',
  })
  async hello() {
    return;
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => console.log(`Server run on port ${PORT}`));
};
main();
