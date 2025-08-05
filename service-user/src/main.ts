import express from 'express';
import { serverSetup, startServer } from '@./shared-utils';
import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.USER_PORT ? Number(process.env.USER_PORT) : 4000;

const app = express();
serverSetup(app, { initPassport: true, jwtAuthMiddleware: true });
startServer(app, port);
