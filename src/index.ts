import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import Register from './modules/user/Register';

const main = async () => {
  //  connect to the db
  await createConnection();

  // define schema
  const schema = await buildSchema({
    resolvers: [Register],
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
