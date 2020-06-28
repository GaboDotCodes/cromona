const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const sentry = require('@sentry/node');

const { connect } = require('./mongodb/connect');

const { PORT, DSN_SENTRY, ENV_SENTRY } = process.env;
const { log } = console;

const app = express();

sentry.init({ dsn: `${DSN_SENTRY}`, environment: `${ENV_SENTRY}` });
connect();

app.use(sentry.Handlers.requestHandler());

const typeDefs = `
type Query {
  hello: String
}
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello world!';
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(sentry.Handlers.errorHandler());

app.listen(PORT, () => {
  log(`Server on http://localhost:${PORT}`);
});
