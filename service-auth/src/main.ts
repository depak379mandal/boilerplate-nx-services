import express from 'express';
import { serverSetup, startServer } from '@./shared-utils';
import { openApiDocument } from './auth.swagger';
import swaggerUi from 'swagger-ui-express';
import router from './auth.route';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
serverSetup(app);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use(router);
startServer(app, port);
