import { z } from "zod";

export const zoDValidationError = z.ZodError

const CNPJ_REGEXP=/^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/
const PASSWORD_REGEXP=/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

export const regiterUserRequestBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
              .min(8, "Password length must be greater then or equal to 8")
              .refine((pass) => 
                PASSWORD_REGEXP.test(pass), 
                "Password must contain at least one uppercase, one lowercase, one numeric and one special character"),
  passwordConfirmation: z.string()
}).refine((object) => object.password === object.passwordConfirmation, {
  message: "Passwords don't match",
  path: ["passwordConfirmation"]
})

export const regiterGymRequestBodySchema = z.object({
  tradeName: z.string(),
  taxpayerId: z.string().refine((cnpj) => CNPJ_REGEXP.test(cnpj), "Taxpayer ID must be valid!"),
  email: z.string().email(),
  description: z.string().optional(),
  phone: z.string().optional(),
  url: z.string().url('Must be a valid URL').optional(),
  latitude: z.number(),
  longitude: z.number(),
})

const dbGymSchema = regiterGymRequestBodySchema.omit({
  tradeName: true
}).extend({
  "trade-name": z.string()
})

export type RegisterUserRequestBodySchemaType = z.infer<typeof regiterUserRequestBodySchema>

export type RegisterGymRequestBodySchemaType = z.input<typeof regiterGymRequestBodySchema>
export type RegisterGymRequestOutputBodySchemaType = z.output<typeof dbGymSchema>