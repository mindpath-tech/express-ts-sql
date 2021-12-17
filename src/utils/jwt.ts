import { serverConfig } from '@src/config';
import { JWT_OBJECT } from '@src/types/jwt';
import jwt from 'jsonwebtoken';

const jwtSecretKey = serverConfig.jwtSecretKey;

export function generateJWT(data: JWT_OBJECT): string {
  const token = jwt.sign(data, jwtSecretKey, { expiresIn: '1d' });
  return token;
}

export function validateJwtToken(token: string): JWT_OBJECT | null {
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    return <JWT_OBJECT>decoded;
  } catch (err) {
    return null;
  }
}
