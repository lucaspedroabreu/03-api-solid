import { IUsersRepository } from "@/repositories/repositories-interfaces";
import { comparePassword } from '@/libs/crypto';
import { InvalidAuthenticationCredentialsError } from "@/libs/Errors/invalid-auth-credentials-error";
import { User } from "@prisma/client";

interface IAuthRequest {
  credentials: {
    email: string
    password: string
  }
}

interface IAuthResponse {
  auth: 'success'
  user: User
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ credentials }: IAuthRequest): Promise<IAuthResponse> {
    // authentication logic
    const user = await this.usersRepository.findByEmail(credentials.email)
    if (!user) throw new InvalidAuthenticationCredentialsError('Invalid Credentials!')

    const doesPasswordMatch = await comparePassword(credentials.password, user.password_salt, user.password_hash)
    if (!doesPasswordMatch) throw new InvalidAuthenticationCredentialsError('Invalid Credentials!')
    
    return {
      auth: 'success',
      user
    }
  }
}