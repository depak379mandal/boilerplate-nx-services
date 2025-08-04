import * as jwt from 'jsonwebtoken';

const generateJwt = (payload: { id: string }) => {
  return jwt.sign(payload, process.env['JWT_SECRET']!, {
    expiresIn: '1h',
  });
};

const verifyJwt = (token: string) => {
  return jwt.verify(token, process.env['JWT_SECRET']!);
};

export { generateJwt, verifyJwt };
