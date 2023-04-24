import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUserUseCase, RegisterGymUseCase } from '@/services/registerUseCase';

export function MakeRegisterUseCase(useCase: 'users' | 'gyms') {
  if (useCase === 'users') {
    const usersRepositroy = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(usersRepositroy)

    return registerUserUseCase
  }

  if (useCase === 'gyms') {
    const gymsRepository = new PrismaGymsRepository()
    const registerGymsUseCase = new RegisterGymUseCase(gymsRepository)

    return registerGymsUseCase
  }
}