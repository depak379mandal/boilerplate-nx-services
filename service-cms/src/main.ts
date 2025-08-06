import express, { RequestHandler } from 'express';
import { serverSetup, startServer } from '@./shared-utils';
import { openApiDocument } from './auth.swagger';
import swaggerUi from 'swagger-ui-express';
import router from './auth.route';
const port = process.env.CMS_PORT ? Number(process.env.CMS_PORT) : 8001;

const app = express();
serverSetup(app);
app.use('/docs', swaggerUi.serve as unknown as RequestHandler, swaggerUi.setup(openApiDocument) as unknown as RequestHandler);
app.use(router);
startServer(app, port);
