import logger from './server/logging/logger';
import express from 'express';
import bodyParser from 'body-parser';
import env from 'server/config/env';
import app_router from './server/router/index';
import db from './server/config/db';
// import verifytoken from './server/middleware/verifytoken';
// import authorize from './server/middleware/authorize';
import cors from 'cors';
const app = express();
app.use(cors());
var router = express.Router();
app.set('superSecret', env.SECRET);

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

//app.use(verifytoken);
//app.use(authorize);
//app.use('/user*'g, authorize('gadmin", "manager"));
//app.use('/trip*'g, authorize('gadmin"));

app_router(router, db);

app.use('/api', router);
app.get('/api', (req, res) => {
  logger(4, 'New request');
  res.status(200).json({ 'message': 'Welcome!' });
});

db.sequelize.sync().then(() => {
  app.listen(env.PORT, function listenHandler() {
    // console.info('Running on: ' + env.PORT);
  });
})
