import { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { AppDataSource } from '@./shared-db';
import { SwaggerOptions } from 'swagger-ui-express';
import { initPassport, jwtAuthMiddleware } from '../middleware/auth.middleware';
import { Options, rateLimit } from 'express-rate-limit';
import bodyParser from 'body-parser';
import { globalErrorHandler } from './global-error.helper';

export const serverSetup = async (
  app: Express,
  options?: {
    corsOptions?: cors.CorsOptions;
    swaggerOptions?: SwaggerOptions;
    initPassport?: boolean;
    jwtAuthMiddleware?: boolean;
    rateLimitOptions?: Partial<Options>;
  }
) => {
  const {
    corsOptions,
    initPassport: _initPassport,
    jwtAuthMiddleware: _jwtAuthMiddleware,
    rateLimitOptions: _rateLimitOptions,
  } = options ?? {
    corsOptions: {
      origin: process.env['CORS_ORIGIN']?.split(',') ?? '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
    initPassport: false,
    jwtAuthMiddleware: false,
    rateLimitOptions: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    },
  };
  app.use(globalErrorHandler);
  app.use(bodyParser.json());

  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  app.use(helmet());
  //app.use(compression());
  app.use(morgan('combined'));
  if (_initPassport) {
    app.use(initPassport);
  }
  if (_jwtAuthMiddleware) {
    app.use(jwtAuthMiddleware);
  }
  app.use(rateLimit(_rateLimitOptions));
  await AppDataSource.initialize();
  console.log('Data Source has been initialized!');
};

export const startServer = async (app: Express, port: number) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
