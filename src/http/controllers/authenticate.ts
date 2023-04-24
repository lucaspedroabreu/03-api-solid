import type { FastifyReply, FastifyRequest } from 'fastify'

// import { prisma } from "@/libs/prisma"
// import { generateUniqueSalt, hashPassword } from "@/libs/crypto"
import { regiterUserRequestBodySchema } from "@/libs/validation"
import { AuthenticateUserUseCase } from '@/services/authenticateUserUseCase';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { InvalidAuthenticationCredentialsError } from '@/libs/Errors/invalid-auth-credentials-error';

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authSchema = regiterUserRequestBodySchema.innerType().pick({
      email: true,
      password: true
    })

    const credentials = authSchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)
  
    const { auth, user } = await authenticateUserUseCase.execute({ credentials })

    reply.code(200).send({
      auth
    })

  } catch (error) {
    if (error instanceof InvalidAuthenticationCredentialsError) {
      return reply.code(error.code).send({
        error: error.name,
        'status-code': error.code,
        message: error.message,
        stack: error.stack
      });
    }

    throw error
  } 
}