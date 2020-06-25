const express = require('express');
const sentry = require('@sentry/node');

const { PORT, DSN_SENTRY, ENV_SENTRY } = process.env;
const { log } = console;

sentry.init({ dsn: `${DSN_SENTRY}`, environment: `${ENV_SENTRY}` });
const app = express();

app.listen(PORT, () => {
  log(`Server on http://localhost:${PORT}`);
});
