import express from 'express';
import { initPassport, jwtAuthMiddleware } from '@./shared-utils';
import { AppDataSource, User } from '@./shared-db';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();
app.use(morgan('dev'));

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    app.use(initPassport());
    app.use(jwtAuthMiddleware);

    app.get('/me', async (req, res) => {
      const payload = req.user as { id: string };
      const user = await AppDataSource.getRepository(User).findOne({
        where: { id: Number(payload.id) },
      });
      res.send({ message: 'Hello API', user });
    });

    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error);
  });
