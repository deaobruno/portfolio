import joi from 'joi'

export default joi
  .object({
    name: joi.string().trim().min(3).max(64).required(),
    email: joi.string().trim().email().max(64).required(),
    subject: joi.string().trim().min(5).max(100),
    message: joi.string().trim().min(5).max(500),
  })
