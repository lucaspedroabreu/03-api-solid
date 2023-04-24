export class InvalidAuthenticationCredentialsError extends Error {
  code: number

  constructor(message: string) {
    super(message)
    this.name = 'Invalid Authentication Credentials Error'
    this.code = 401
  }
}