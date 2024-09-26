import joi from 'joi'

export default joi
  .object({
    email: joi.string().trim().email().max(64).required(),
    password: joi.string().trim().min(8).max(100).required(),
  })
