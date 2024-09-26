import joi from 'joi'

export default joi
  .object({
    name: joi.string().trim().min(3).max(64).required(),
    description: joi.string().trim().min(3).max(100).required(),
    url: joi.string().trim().uri().min(15).max(100),
    repository: joi.string().trim().uri().min(15).max(100),
  })
