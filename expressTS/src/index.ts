import 'reflect-metadata';

import express, {Express, Request, Response } from 'express';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
//All controllers
import './controllers/Login.controllers';
import './controllers/Root.controller';
import './controllers/Protected.controllers';

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieSession({keys: ['asdfasdf']}));

app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('listening on port : 3000')
});