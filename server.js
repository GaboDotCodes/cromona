const express = require('express');
const sentry = require('@sentry/node');

const { connect } = require('./mongodb/connect');

const { PORT, DSN_SENTRY, ENV_SENTRY } = process.env;
const { log } = console;

const app = express();

sentry.init({ dsn: `${DSN_SENTRY}`, environment: `${ENV_SENTRY}` });
connect();

app.use(sentry.Handlers.requestHandler());

app.use(sentry.Handlers.errorHandler());

app.listen(PORT, () => {
  log(`Server on http://localhost:${PORT}`);
});
