import { Prisma } from "@prisma/client";
import { FastifyReply } from "fastify";
import { zoDValidationError } from "../validation";
import { DatabaseConflictError } from "./db-conflict-error";

export function creationErrorHandler(error: any, reply: FastifyReply): FastifyReply {

  if (error instanceof zoDValidationError) {

    const errorsMessages = error.errors.map((err, index) => {
      return `${index+1}: ${err.message}`
    })

    return reply.code(400).send({ 
      error: 'Invalid request payload',
      message: [...errorsMessages],
      details: error.errors 
    });

  } else if (error instanceof DatabaseConflictError) {
    return reply.code(error.code).send({
      error: error.name,
      'status-code': error.code,
      message: error.message,
      stack: error.stack
    });
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {

    switch (error.code) {
      case 'P2002':
        return reply.code(409).send({
          error: `Unique constraint failed on the input: ${error.meta?.target}`, details: {
            'Prisma Specific Error Code': error.code,
            message: error.message
          }
        });
    
      default:
        return reply.code(400).send({
          error: 'Invalid request payload', details: {
            'Prisma Specific Error Code': error.code,
            message: error.message
          }
        });
    }

  } else {
    throw error

    // we could return the internal error below,
    // but this prevents the node error handler to deal with the error and show some specific messages

    // return reply.code(500).send({ 
    //   error: 'Internal server error', 
    //   "Error prototype chain:":  Object.getPrototypeOf(error)
    // });
    
  }
}