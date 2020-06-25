const express = require('express');
const sentry = require('@sentry/node');

const { PORT, DSN_SENTRY, ENV_SENTRY } = process.env;
const { log } = console;

log(PORT)
log(DSN_SENTRY)
log(ENV_SENTRY)

sentry.init({ dsn: `${DSN_SENTRY}`, environment: `${ENV_SENTRY}`});
const app = express();

app.listen(PORT, () => {
    log(`Server on http://localhost:${PORT}`)
})