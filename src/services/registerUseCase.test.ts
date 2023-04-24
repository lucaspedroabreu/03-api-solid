import { comparePassword } from '@/libs/crypto'
import { DatabaseConflictError } from '@/libs/Errors/db-conflict-error'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { Gym } from '@prisma/client'
import { expect, test, describe, it, suite } from 'vitest'
import { RegisterGymUseCase, RegisterUserUseCase } from './registerUseCase'

suite("Register 'use-case'", () => {

  suite("'register-user-use-case':", () => {

    it('should salt password before storing', async () => {
      const usersRepository = new InMemoryUsersRepository()
      const sut = new RegisterUserUseCase(usersRepository)

      const passwordExample = {
        password: 'Example@123',
        passwordConfirmation: 'Example@123'
      }

      const { newRegisteredUser } = await sut.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        ...passwordExample
      })

      expect(newRegisteredUser.password_salt).toBeTruthy()
    })

    it('should hash user password upon registration', async () => {
      const usersRepository = new InMemoryUsersRepository()
      const sut = new RegisterUserUseCase(usersRepository)

      const passwordExample = 'Example@123'

      const { newRegisteredUser } = await sut.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        password: passwordExample,
        passwordConfirmation: passwordExample
      })

      expect(comparePassword(passwordExample, newRegisteredUser.password_salt, newRegisteredUser.password_hash)).toBeTruthy()
    })

    it('should not create new user with a registered e-mail', async () => {
      const usersRepository = new InMemoryUsersRepository()
      const sut = new RegisterUserUseCase(usersRepository)

      const passwordExample = {
        password: 'Example@123',
        passwordConfirmation: 'Example@123'
      }
      const desiredEmail = 'john@doe.com'

      await sut.execute({
        name: 'John Doe',
        email: desiredEmail,
        ...passwordExample
      })

      try {
        await sut.execute({
          name: 'Another John Doe',
          email: desiredEmail,
          ...passwordExample
        })
      } catch (err) {
        expect(err).toBeInstanceOf(DatabaseConflictError)
      }
    })

    it('should register correctly a new user', async () => {
      const usersRepository = new InMemoryUsersRepository()
      const sut = new RegisterUserUseCase(usersRepository)

      const userExample = {
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'Example@123',
        passwordConfirmation: 'Example@123'
      }

      const { newRegisteredUser } = await sut.execute({
        ...userExample,
      })

      expect(newRegisteredUser.id).toEqual('test-user')
    })
  })

  suite("'register-gym-use-case':", () => {
    it('should not register two gyms with same taxpayer id', async () => {
      const gymsRepository = new InMemoryGymsRepository()
      const sut = new RegisterGymUseCase(gymsRepository)

      const exampleGym = {
        tradeName: 'Academia do Zé',
        taxpayerId: '30.820.247/0001-15',
        email: 'contato@academiadoze.com',
        description: 'Academia do zé',
        latitude: 1232323,
        longitude: 2232344,
      }

      await sut.execute(exampleGym)

      const collidingGym = {
        ...exampleGym,
        tradeName: 'Academia do Fulano',
        // taxpayerId: '30.820.247/0001-16',
        email: 'contato@academiadofulano.com.br',
        description: 'Academia do Fulano',
        latitude: 348348,
        longitude: 333333,
      }
      
      await expect(sut.execute(collidingGym))
      // .resolves
      .rejects.toBeInstanceOf(DatabaseConflictError)
    })

    it('should not register two gyms with overlapping tradenames', async () => {
      const gymsRepository = new InMemoryGymsRepository()
      const sut = new RegisterGymUseCase(gymsRepository)

      const exampleGym = {
        tradeName: 'Academia do Zé',
        taxpayerId: '30.820.247/0001-15',
        email: 'contato@academiadoze.com',
        description: 'Academia do zé',
        latitude: 1232323,
        longitude: 2232344,
      }

      await sut.execute(exampleGym)

      const collidingGym = {
        ...exampleGym,
        // tradeName: 'Academia do Fulano',
        taxpayerId: '20.320.727/0015-09',
        email: 'contato@academiadofulano.com.br',
        description: 'Academia do Fulano',
        latitude: 348348,
        longitude: 333333,
      }

      await expect(sut.execute(collidingGym))
      // .resolves
      .rejects.toBeInstanceOf(DatabaseConflictError)
    })
  })
})