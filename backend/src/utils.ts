import crypto from 'crypto';
import util from 'util';

const hashPassword = util.promisify(crypto.pbkdf2);

const PORT = 9000;

export function isInteger(input: string) {
  return input?.match(/^\d+$/) ?? false;
}

export function getPort(arg: string, env: string) {
  const defaultPort = PORT;

  return isInteger(env)
    ? parseInt(env)
    : isInteger(arg)
      ? parseInt(arg)
      : defaultPort;
}

export async function calculatePasswordHash(
  plainTextPassword: string,
  passwordSalt: string
) {
  const passwordHash = await hashPassword(
    plainTextPassword,
    passwordSalt,
    100000,
    64,
    'sha512'
  );
  return passwordHash.toString('hex');
}
