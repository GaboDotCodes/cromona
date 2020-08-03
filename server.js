const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const sentry = require('@sentry/node');
const admin = require('firebase-admin');
const typeDefs = require('./graphql/typesMerged');
const resolvers = require('./graphql/resolversMerged');
const { connect } = require('./mongodb/connect');

const registervalidation = require('./api/functions/registervalidation');
const shortUrl = require('./api/functions/shortUrl');
const findShortAndClick = require('./api/functions/findShortAndClick');

const { PORT, DSN_SENTRY, ENV_SENTRY, ENV, REDIRECT_URL_ALL, SHORTENER_API_KEY } = process.env;
const { log, error } = console;

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
    graphiql: ENV === 'sandbox',
  })
);

app.post('/shortURL', async (req, res) => {
  try {
    const { longUrl, apiKey } = req.query;
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
      `https://docs.google.com/forms/d/e/1FAIpQLSfwR7GrM-_8wXIEz2PeQtlZnhuAZ7u-JftjR-2kmANxvYOk5w/viewform?usp=pp_url&entry.925565816=La+tengo&entry.1002620254=La+tengo&entry.1121663085=La+tengo&entry.1480398913=La+tengo&entry.1053668812=La+tengo&entry.565229779=La+tengo&entry.1025913125=La+tengo&entry.579810939=La+tengo&entry.1745054190=La+tengo&entry.183923840=La+tengo&entry.1120208959=La+tengo&entry.368910779=La+tengo&entry.1063748560=La+tengo&entry.1466242555=La+tengo&entry.1634421778=La+tengo&entry.961305118=La+tengo&entry.551126001=La+tengo&entry.11898674=La+tengo&entry.1704752011=La+tengo&entry.1934096427=La+tengo&entry.166015806=La+tengo&entry.632178109=La+tengo&entry.1039713058=La+tengo&entry.1717210363=La+tengo&entry.30479284=La+tengo&entry.1120385610=La+tengo&entry.1449500970=La+tengo&entry.1306514354=La+tengo&entry.766688107=La+tengo&entry.340488680=La+tengo&entry.901335576=La+tengo&entry.601355780=La+tengo&entry.971612254=La+tengo&entry.1187469241=La+tengo&entry.1985610001=La+tengo&entry.410522961=La+tengo&entry.2032780845=La+tengo&entry.573781894=La+tengo&entry.154525860=La+tengo&entry.1694572187=La+tengo&entry.764855682=La+tengo&entry.112730524=La+tengo&entry.1920935089=La+tengo&entry.1424852031=La+tengo&entry.1915971240=La+tengo&entry.1448990176=La+tengo&entry.560082953=La+tengo&entry.1366225483=La+tengo&entry.1165847658=La+tengo&entry.275483656=La+tengo&entry.1251200574=La+tengo&entry.1253178399=La+tengo&entry.477666616=La+tengo&entry.1704024933=La+tengo&entry.2031649536=La+tengo&entry.1513881996=La+tengo&entry.928759592=La+tengo&entry.719037071=La+tengo&entry.2129017541=La+tengo&entry.1496024089=La+tengo&entry.56535369=La+tengo&entry.181568451=La+tengo&entry.1868969374=La+tengo&entry.1545040451=La+tengo&entry.180867699=La+tengo&entry.1888993355=La+tengo&entry.171602656=La+tengo&entry.1412245852=La+tengo&entry.1373831711=La+tengo&entry.1082815882=La+tengo&entry.760600440=La+tengo&entry.1710825231=La+tengo&entry.1785177412=La+tengo&entry.706259786=La+tengo&entry.1285958169=La+tengo&entry.1694646790=La+tengo&entry.1215059394=La+tengo&entry.2015750825=La+tengo&entry.637856812=La+tengo&entry.1784902503=La+tengo&entry.593894877=La+tengo&entry.932641020=La+tengo&entry.1610363797=La+tengo&entry.1117979989=La+tengo&entry.265158949=La+tengo&entry.627216591=La+tengo&entry.275388277=La+tengo&entry.222992240=La+tengo&entry.667500661=La+tengo&entry.2024144291=La+tengo&entry.54543032=La+tengo&entry.1940012559=La+tengo&entry.1333067390=La+tengo&entry.284574296=La+tengo&entry.851387866=La+tengo&entry.1421447917=La+tengo&entry.1496304765=La+tengo&entry.1002249835=La+tengo&entry.592968579=La+tengo&entry.1544858761=La+tengo&entry.395210705=La+tengo&entry.1532816672=La+tengo&entry.1165800978=La+tengo&entry.316895142=La+tengo&entry.620976320=La+tengo&entry.93120764=La+tengo&entry.1215689937=La+tengo&entry.15772570=La+tengo&entry.543427025=La+tengo&entry.1269945045=La+tengo&entry.1218632006=La+tengo&entry.1082778758=La+tengo&entry.879693176=La+tengo&entry.1108846701=La+tengo&entry.1880853003=La+tengo&entry.604642091=La+tengo&entry.1709098082=La+tengo&entry.1076262659=La+tengo&entry.1769675672=La+tengo&entry.318161527=La+tengo&entry.1866110760=La+tengo&entry.150239466=La+tengo&entry.362240740=La+tengo&entry.1837260000=La+tengo&entry.1632068145=La+tengo&entry.1890342647=La+tengo&entry.742541434=La+tengo&entry.1366301722=La+tengo&entry.887671443=La+tengo&entry.492946417=La+tengo&entry.388754045=La+tengo&entry.1153034909=La+tengo&entry.62704544=La+tengo&entry.214610071=La+tengo&entry.1617361373=La+tengo&entry.1029322403=La+tengo&entry.650531063=La+tengo&entry.1898798548=La+tengo&entry.671987967=La+tengo&entry.781867759=La+tengo&entry.676123485=La+tengo&entry.18236687=La+tengo&entry.150980675=La+tengo&entry.653728605=La+tengo&entry.713734920=La+tengo&entry.445744173=La+tengo&entry.868532487=La+tengo&entry.1268518596=La+tengo&entry.1289081960=La+tengo&entry.1213423005=La+tengo&entry.1240746650=La+tengo&entry.850061925=La+tengo&entry.1579985738=La+tengo&entry.915298227=La+tengo&entry.1750580225=La+tengo&entry.53328521=La+tengo&entry.1116652292=La+tengo&entry.929321197=La+tengo&entry.323696217=La+tengo&entry.1855168926=La+tengo&entry.1881735172=La+tengo&entry.1682956277=La+tengo&entry.1917585611=La+tengo&entry.214374453=La+tengo&entry.1317542495=La+tengo&entry.67111308=La+tengo&entry.801260234=La+tengo&entry.213123918=La+tengo&entry.1184413387=La+tengo&entry.919682553=La+tengo&entry.224098810=La+tengo&entry.1061240841=La+tengo&entry.1927628673=La+tengo&entry.279275193=La+tengo&entry.998980531=La+tengo&entry.2050074529=La+tengo&entry.1388763174=La+tengo&entry.1147445720=La+tengo&entry.1209599932=La+tengo&entry.1530703277=La+tengo&entry.222087996=La+tengo&entry.820450765=La+tengo&entry.373806679=La+tengo&entry.1211111388=La+tengo&entry.613668341=La+tengo&entry.788549254=La+tengo&entry.2063842016=La+tengo&entry.1019242961=La+tengo&entry.78756230=La+tengo&entry.979238403=La+tengo&entry.2053743240=La+tengo&entry.508977852=La+tengo&entry.1314197844=La+tengo&entry.279503498=La+tengo&entry.1485620980=La+tengo&entry.648440284=La+tengo&entry.290311134=La+tengo&entry.498462292=La+tengo&entry.378138164=La+tengo&entry.1542560928=La+tengo&entry.581467359=La+tengo&entry.1263236195=La+tengo&entry.902939831=La+tengo&entry.1513979976=La+tengo&entry.1256083529=La+tengo&entry.1830872826=La+tengo&entry.1034481972=La+tengo&entry.2002373198=La+tengo&entry.2125693287=La+tengo&entry.312043062=La+tengo&entry.468474095=La+tengo&entry.957499488=La+tengo&entry.1240722645=La+tengo&entry.1302981497=La+tengo&entry.1703380674=La+tengo&entry.245575756=La+tengo&entry.1557260399=La+tengo&entry.2231716=La+tengo&entry.1736175990=La+tengo&entry.614559367=La+tengo&entry.558214596=La+tengo&entry.41601039=La+tengo&entry.515842682=La+tengo&entry.1394138015=La+tengo&entry.556894608=La+tengo&entry.223795098=La+tengo&entry.2020791484=La+tengo&entry.2030863127=La+tengo&entry.552061762=La+tengo&entry.433541760=La+tengo&entry.546050611=La+tengo&entry.1692998330=La+tengo&entry.699027675=La+tengo&entry.727353547=La+tengo&entry.566325062=La+tengo&entry.1897303798=La+tengo&entry.168498101=La+tengo&entry.1557276494=La+tengo&entry.676824828=La+tengo&entry.1405774669=La+tengo&entry.747974317=La+tengo&entry.215859430=La+tengo&entry.1623357824=La+tengo&entry.1446740339=La+tengo&entry.513318224=La+tengo&entry.374294461=La+tengo&entry.1605318574=La+tengo&entry.622328281=La+tengo&entry.841203856=La+tengo&entry.1998513087=La+tengo`
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
