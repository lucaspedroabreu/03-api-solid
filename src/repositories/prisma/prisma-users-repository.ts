import { prisma } from '@/libs/prisma';
import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../repositories-interfaces';

export class PrismaUsersRepository implements IUsersRepository {
  async create(user: Prisma.UserCreateInput) {
    const newRegisteredUser = await prisma.user.create({
      data: user
    })

    console.log(newRegisteredUser)

    return newRegisteredUser
  }

  async findByEmail(desiredUserEmail: string): Promise<User | null> {

    const foundUser = await prisma.user.findUnique({
      where: {
        email: desiredUserEmail
      }
    })

    return foundUser
  }
  async findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  async update(data: Partial<Prisma.UserCreateInput>): Promise<User> {
    throw new Error('Method not implemented.');
  }
}