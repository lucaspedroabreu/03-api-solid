import { randomUUID } from "crypto";
import { IGymsRepository } from "../repositories-interfaces";
import { Prisma, Gym } from "@prisma/client";

export class InMemoryGymsRepository implements IGymsRepository {
  public table: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const newGym = {
      id: `test-gym-${randomUUID()}`,
      'trade_name': data.trade_name,
      'taxpayer_id': data.taxpayer_id,
      email: data.email,
      latitude: data.latitude as Prisma.Decimal,
      longitude: data.longitude as Prisma.Decimal,
      description: data.description ?? null,
      phone: data.phone ?? null,
      url: data.url ?? null
    }

    this.table.push(newGym)

    return newGym
  }

  async findByTradeName(tradeName: string): Promise<Gym[] | null> {
    const gyms = this.table.filter(gym => gym.trade_name.toLocaleLowerCase().includes(tradeName.toLocaleLowerCase()))

    if(!gyms) return null

    return gyms
  }

  findByEmail(email: string): Promise<Gym | null> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.table.find(gym => gym.taxpayer_id === id)

    if(!gym) return null

    return gym
  }

  findNearby(location: { latitude: number; longitude: number; }): Promise<Gym | null> {
    throw new Error("Method not implemented.");
  }

  update(data: Partial<Prisma.UserCreateInput>): Promise<Gym> {
    throw new Error("Method not implemented.");
  }

}