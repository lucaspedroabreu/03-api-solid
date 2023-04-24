import type { FastifyReply, FastifyRequest } from 'fastify'

// import { prisma } from "@/libs/prisma"
// import { generateUniqueSalt, hashPassword } from "@/libs/crypto"
import { regiterGymRequestBodySchema, regiterUserRequestBodySchema, zoDValidationError } from "@/libs/validation"
import { creationErrorHandler } from '../../libs/Errors/creationErrorHandler';
import { RegisterGymUseCase, RegisterUserUseCase } from '@/services/registerUseCase';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = regiterUserRequestBodySchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(usersRepository)
  
    const { newRegisteredUser } = await registerUserUseCase.execute(user)

    reply.code(201).send({
      name: newRegisteredUser.name,
      email: newRegisteredUser.email
    })

  } catch (error) {
    creationErrorHandler(error, reply)
  } 
}

export const registerGym = async (request: FastifyRequest, reply: FastifyReply) => {
  try {

    const gym = regiterGymRequestBodySchema.parse(request.body)

    const gymsRepository = new PrismaGymsRepository()
    const registerGymUseCase = new RegisterGymUseCase(gymsRepository)
    
    const { newRegisteredGym } = await registerGymUseCase.execute(gym)

    reply.code(201).send({
      gym: newRegisteredGym.trade_name,
      email: newRegisteredGym.email,
      location: {
        latitude: newRegisteredGym.latitude,
        longitude: newRegisteredGym.longitude
      }
    })

  } catch (error) {
    return creationErrorHandler(error, reply)
  }
}