import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';

export const generateToken = (user) => `JWT ${jwt.sign({ id: user.email }, jwtSecret)}`;
