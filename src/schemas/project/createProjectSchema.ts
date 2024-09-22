import joi from 'joi'

export default joi
  .object({
    name: joi.string().min(3).max(64).required(),
    description: joi.string().min(3).max(100).required(),
  })
