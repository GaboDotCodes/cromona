const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const sentry = require('@sentry/node');
const admin = require('firebase-admin');
const typeDefs = require('./graphql/typesMerged');
const resolvers = require('./graphql/resolversMerged');
const { connect } = require('./mongodb/connect');

const { PORT, DSN_SENTRY, ENV_SENTRY } = process.env;
const { log } = console;

const app = express();

sentry.init({ dsn: `${DSN_SENTRY}`, environment: `${ENV_SENTRY}` });
app.use(sentry.Handlers.requestHandler());

connect();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  '/gql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(sentry.Handlers.errorHandler());

app.listen(PORT, () => {
  log(`Server on http://localhost:${PORT}`);
});
