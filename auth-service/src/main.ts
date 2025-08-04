import express from 'express';
import { AppDataSource, User } from '@./shared-db';
import { generateJwt } from '@./shared-utils';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error);
  });

app.post('/login', async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOne({
    where: { name: req.body.name },
  });
  const token = generateJwt({ id: user?.id.toString() ?? '' });
  res.send({ message: 'Login', token });
});

app.post('/register', async (req, res) => {
  const user = await AppDataSource.getRepository(User).save({
    name: 'Deepak Mandal',
  });
  res.send({ message: 'Register', user });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
