const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const sentry = require('@sentry/node');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const typeDefs = require('./graphql/typesMerged');
const resolvers = require('./graphql/resolversMerged');
const { connect } = require('./mongodb/connect');

const registervalidation = require('./api/functions/registervalidation');
const shortUrl = require('./api/functions/shortUrl');
const findShortAndClick = require('./api/functions/findShortAndClick');
const registerPreview = require('./api/functions/registerPreview');
const getNamePreview = require('./api/functions/getNamePreview');

const { PORT, DSN_SENTRY, ENV_SENTRY, ENV, REDIRECT_URL_ALL, SHORTENER_API_KEY } = process.env;
const { log, error } = console;

const app = express();

sentry.init({ dsn: `${DSN_SENTRY}`, environment: `${ENV_SENTRY}` });
app.use(sentry.Handlers.requestHandler());

app.use(express.json());

/*
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
*/

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
    graphiql: ENV === 'sandbox',
  })
);

app.use( express.static(path.resolve(__dirname, 'build')) )

app.get('/p/:hostUid*?', async (req, res) => {
  try {
    const { hostUid } = req.params;
    const obj = await getNamePreview(hostUid)
    console.log(obj);
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Some error happened');
        }
        return res.send(data);
    });
  } catch (e) {
    error(e);
    res.redirect('/');
    res.end();
  }
});

app.post('/preview', async (req, res) => {
  try {
    const { name, contact, referedBy } = req.body;
    const registeredPreview = await registerPreview(name, contact, referedBy);
    res.json(registeredPreview);
  } catch (e) {
    error(e);
    res.json(e);
  }
});

app.get('/preview/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const name = await getNamePreview(uid);
    res.json({ name });
  } catch (e) {
    error(e);
    res.json(e);
  }
  
})

app.post('/shortURL', async (req, res) => {
  try {
    const { apiKey } = req.query;
    const { longUrl } = req.body;
    if (typeof apiKey === 'undefined' || apiKey !== SHORTENER_API_KEY) throw new Error(res.status(401).send('Unauthorized'));
    if (typeof longUrl === 'undefined') throw new Error(res.status(400).send('Bad request'));
    const shortUrlReturn = await shortUrl(longUrl);
    res.json(shortUrlReturn);
  } catch (e) {
    if (res.statusCode !== 401 && res.statusCode !== 400) {
      error(e);
      res.json(e);
    }
  }
});

app.get('/s/:shortUrl', async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const shortedUrlData = await findShortAndClick(shortUrl);
    res.redirect(shortedUrlData.longUrl);
    res.end();
  } catch (e) {
    error(e);
    res.json(e);
  }
});

app.get('/JetViveLaAventura', async (req, res) => {
  try {
    const utmCampaign = req.query.utm_campaign;
    await registervalidation('/JetViveLaAventura', utmCampaign);
    res.redirect(
      `https://docs.google.com/forms/d/e/1FAIpQLSfwR7GrM-_8wXIEz2PeQtlZnhuAZ7u-JftjR-2kmANxvYOk5w/viewform?usp=sf_link`
    );
    res.end();
  } catch (e) {
    error(e);
    res.json(e);
  }
});

app.get('/', (req, res) => {
  res.redirect(REDIRECT_URL_ALL);
  res.end();
});

app.use(sentry.Handlers.errorHandler());

app.listen(PORT, () => {
  log(`Server on http://localhost:${PORT}`);
});
