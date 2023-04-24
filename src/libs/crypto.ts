import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const hashPassword = async (passwordPlusSalt: string, saltRounds: number = 10): Promise<string> => {
  return await bcrypt.hash(passwordPlusSalt, saltRounds);
};

export const comparePassword = async (password: string, salt: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password + salt, hashedPassword);
};

export const generateUniqueSalt = (length: number = 16): string => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};