import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import { registerSchema } from './schemas/register.schema';

const registry = new OpenAPIRegistry();

registry.register('RegisterRequest', registerSchema);

registry.registerPath({
  tags: ['Auth'],
  method: 'post',
  path: '/register',
  request: {
    body: {
      content: {
        'application/json': {
          schema: registerSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'User registered successfully',
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);
export const openApiDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Auth Service',
    version: '1.0.0',
  },
});
