import { comparePassword, generateUniqueSalt, hashPassword } from '@/libs/crypto'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, test, describe, it, suite } from 'vitest'
import { AuthenticateUserUseCase } from './authenticateUserUseCase';
import { InvalidAuthenticationCredentialsError } from '@/libs/Errors/invalid-auth-credentials-error';

suite("Authenticate User 'use-case'", () => {

    it('should should be able to authenticate user', async () => {
      const usersRepository = new InMemoryUsersRepository()
      const sut = new AuthenticateUserUseCase(usersRepository)

      const credentials = {
        email: 'lucasp.abreu@gmail.com',
        password: 'password'
      }

      const salt = await generateUniqueSalt(16)
      const hashedPassword = await hashPassword(credentials.password+salt, 12)

      const newRegisteredUser = await usersRepository.create({
        name: 'Lucas Pedro Abreu',
        email: credentials.email,
        password_salt: salt,
        password_hash: hashedPassword
      })

      const { auth, user } = await sut.execute({
        credentials
      })

      await expect(auth).toEqual(expect.stringMatching('success'))
      await expect(user).toEqual(newRegisteredUser)
    })

    it('should should not be able to authenticate user with wrong password', async () => {
      const usersRepository = new InMemoryUsersRepository()
      const sut = new AuthenticateUserUseCase(usersRepository)

      const credentials = {
        email: 'lucasp.abreu@gmail.com',
        password: 'password'
      }

      const salt = await generateUniqueSalt(16)
      const hashedPassword = await hashPassword(credentials.password+salt, 12)

      const newRegisteredUser = await usersRepository.create({
        name: 'Lucas Pedro Abreu',
        email: credentials.email,
        password_salt: salt,
        password_hash: hashedPassword
      })

      await expect(() => sut.execute({
        credentials: {
          ...credentials,
          password: 'wrongPassword'
        }
      })).rejects.toBeInstanceOf(InvalidAuthenticationCredentialsError)

    })

    it('should should not be able to authenticate user with wrong email', async () => {
      const usersRepository = new InMemoryUsersRepository()
      const sut = new AuthenticateUserUseCase(usersRepository)

      const credentials = {
        email: 'lucasp.abreu@gmail.com',
        password: 'password'
      }

      const salt = await generateUniqueSalt(16)
      const hashedPassword = await hashPassword(credentials.password+salt, 12)

      const newRegisteredUser = await usersRepository.create({
        name: 'Lucas Pedro Abreu',
        email: credentials.email,
        password_salt: salt,
        password_hash: hashedPassword
      })

      await expect(() => sut.execute({
        credentials: {
          ...credentials,
          email: 'invalido@naoexiste.com'
        }
      })).rejects.toBeInstanceOf(InvalidAuthenticationCredentialsError)

    })
})