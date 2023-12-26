import 'dotenv/config';
import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import { useRoutes } from './routes/index.js';
import useEncoded from './hooks/useEncoded.js';
import { useHandlebars } from './hooks/useHandlebars.js';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://advance-web-alpha.vercel.app'],
    credentials: true,
  }),
);

app.use(session({ secret: 'advance_web', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
useHandlebars(app);
useEncoded(app);
useRoutes(app);

app.listen(process.env.APP_PORT || 3000);
