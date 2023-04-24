import { generateUniqueSalt, hashPassword } from "@/libs/crypto"
import { RegisterGymRequestBodySchemaType, RegisterUserRequestBodySchemaType } from "@/libs/validation"
import type { IUsersRepository, IGymsRepository } from "@/repositories/repositories-interfaces";
import { DatabaseConflictError } from '../libs/Errors/db-conflict-error';

export class RegisterUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user: RegisterUserRequestBodySchemaType) {
    
    const salt = generateUniqueSalt()
    const hashedPassword = await hashPassword(user.password + salt)

    const registeredEmail = await this.usersRepository.findByEmail(user.email)
    if(registeredEmail) throw new DatabaseConflictError('E-mail already Registered')

    const newRegisteredUser = await this.usersRepository.create({
      name: user.name,
      email: user.email,
      password_hash: hashedPassword,
      password_salt: salt
    })
  
    return {
      newRegisteredUser,
      // for future return objects
    }
  }
}

export class RegisterGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute(gym: RegisterGymRequestBodySchemaType) {
  
    const { tradeName, taxpayerId, ...inputGym } = gym

    const conflictingGym = await this.gymsRepository.findById(taxpayerId)
    if (conflictingGym) throw new DatabaseConflictError('This taxpayer id already has an account!')

    const similarNameGyms = await this.gymsRepository.findByTradeName(tradeName)
    if (similarNameGyms) {
      similarNameGyms.forEach(gym => {
        if(gym.trade_name === tradeName) throw new DatabaseConflictError('There is a gym registered with the same Tradename') 
      })
    }

  
    const newRegisteredGym = await this.gymsRepository.create({
      ...inputGym,
      trade_name: tradeName,
      taxpayer_id: taxpayerId,
    })
  
    return {
      newRegisteredGym,
      // for future return objects
    }
  }
}