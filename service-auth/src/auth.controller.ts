import { AppDataSource, User } from '@./shared-db';
import { CreatedResponse } from '@./shared-utils';
import { Request, Response } from 'express';
import { registerSchema } from './schemas/register.schema';
import { z } from 'zod';

const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  const { name } = req.body as z.infer<typeof registerSchema>;
  console.log('name', name);
  const user = await userRepository.save({
    name,
  });
  return CreatedResponse(
    { message: 'User registered successfully', data: user },
    res
  );
};
