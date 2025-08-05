import { AppDataSource, Log } from '@./shared-db';
import { Request, Response, NextFunction } from 'express';

export const logMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;
  let responseBody: any = null;

  res.send = function (body: any) {
    responseBody = body;
    return originalSend.call(this, body);
  };

  const logRepository = AppDataSource.getRepository(Log);
  let log = logRepository.create({
    body: req.body,
    query: req.query,
    params: req.params,
    headers: req.headers,
    method: req.method,
    url: req.url,
  });
  log = await logRepository.save(log);
  res.on('finish', async () => {
    await logRepository.update(log.id, {
      response: JSON.stringify(responseBody),
    });
  });
  next();
};
