export class DatabaseConflictError extends Error {
  code: number

  constructor(message: string) {
    super(message)
    this.name = 'Database Conflict Error'
    this.code = 409
  }
}