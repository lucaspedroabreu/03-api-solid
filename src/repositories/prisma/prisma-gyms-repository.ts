import { DatabaseConflictError } from '@/libs/Errors/db-conflict-error';
import { prisma } from '@/libs/prisma';
import { Gym, Prisma } from '@prisma/client'
import { IGymsRepository } from '../repositories-interfaces';

export class PrismaGymsRepository implements IGymsRepository {
  async findByTradeName(tradeName: string) {
    const gyms = await prisma.gym.findMany({
      where: {
        trade_name: {
          contains: tradeName
        }
      }
    })

    return gyms
  }

  async create(gym: Prisma.GymCreateInput) {
    const newRegisteredGym = await prisma.gym.create({
      data: gym
    })

  
    return newRegisteredGym
  }

  async findByEmail(email: string): Promise<Gym | null> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        taxpayer_id: id
      }
    })

    return gym
  }
  async findNearby(location: { latitude: number; longitude: number; }): Promise<Gym | null> {
    throw new Error('Method not implemented.');
  }
  async update(data: Partial<Prisma.UserCreateInput>): Promise<Gym> {
    throw new Error('Method not implemented.');
  }
}