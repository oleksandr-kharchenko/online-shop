import { object, string } from 'yup'

export const loginSchema = object({
  username: string().min(2, 'Minimum 2 characters').required(),
  password: string().min(4, 'Minimum 4 characters').required()
}).required()