import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userId: number): string => {
  const token = jwt.sign({ userId }, process.env.SECRET as string, {
    expiresIn: '7d',
  });

  return token;
};

export { generateToken };
