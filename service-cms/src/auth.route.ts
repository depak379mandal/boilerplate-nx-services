import { Router } from 'express';
import { validationMiddleware } from '@./shared-utils';
import { registerSchema } from './schemas/register.schema';
import { register } from './auth.controller';

const router = Router();

router.post('/register', validationMiddleware(registerSchema), register);

export default router;
