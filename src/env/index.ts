import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({
    path: '.env.test',
  })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite3', 'pg', 'postgres']).default('sqlite3'),
  DATABASE_URL: z.string().optional(),
  PORT: z.coerce.number().default(3333),
  HOST: z.string().url().or(z.string().ip()).default('0.0.0.0')
})

// zod parses process.env against our schema
// this way zod will throw an error if the problem comes from env
// and avoid a lot of headaches
const safeEnv = envSchema.safeParse(process.env)

if (safeEnv.success === false) {
  console.error('⚠️ Invalid environment variables!', safeEnv.error.format())

  throw new Error('Invalid environment variables. Shutting down server.')
}

export const env = safeEnv.data
