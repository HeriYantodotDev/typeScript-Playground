import express, {Express, Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import cookieSession = require("cookie-session");

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieSession({keys: ['asdfasdf']}));

app.use(router);

app.listen(3000, () => {
  console.log('listening on port : 3000')
});