import { Response, Request, NextFunction } from 'express';
import { logger } from '../logger';
import { AppDataSource } from '../data-source';
import { User } from '../models/users';

export async function getAllUsers(
  request: Request,
  response: Response,
  next: NextFunction
) {
  logger.info(`Called getAllUsers()`);

  try {
    logger.info(`Called calling getAllUsers()`);

    const users = await AppDataSource.getRepository(User)
      .createQueryBuilder('users')
      .orderBy('users.email')
      .getMany();

    response.status(200).json({ users });
  } catch (error) {
    logger.error(`Error calling getAllUsers()`);
    return next(error);
  }
}
