import { Gym, Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User | never>

  findByEmail(email: string): Promise<User | null>

  findById(id: string): Promise<User | null>

  update(data: Partial<Prisma.UserCreateInput>): Promise<User | never>
}

export interface IGymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym | never>

  findByEmail(email: string): Promise<Gym | null>

  findByTradeName(tradeName: string): Promise<Gym[] | null>

  findById(id: string): Promise<Gym | null>

  findNearby(location: { latitude: number, longitude: number}): Promise<Gym | null>

  update(data: Partial<Prisma.UserCreateInput>): Promise<Gym | never>
}
