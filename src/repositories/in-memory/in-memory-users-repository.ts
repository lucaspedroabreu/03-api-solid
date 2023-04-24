
import { IUsersRepository } from '../repositories-interfaces.d';
import { Prisma, User } from '@prisma/client';

export class InMemoryUsersRepository implements IUsersRepository {
  public table: User[]  = []

  async create(data: Prisma.UserCreateInput) {
    const newUser = {
      id: 'test-user',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      password_salt: data.password_salt,
      created_at: new Date()
    }

    this.table.push(newUser)

    return newUser
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.table.find(user =>  user.email === email)

    if (!user) return null

    return user
  }

  async findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  async update(data: Partial<Prisma.UserCreateInput>): Promise<User> {
    throw new Error('Method not implemented.');
  }

}