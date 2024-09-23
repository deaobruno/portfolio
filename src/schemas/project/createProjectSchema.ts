import joi from 'joi'

export default joi
  .object({
    name: joi.string().min(3).max(64).required(),
    description: joi.string().min(3).max(100).required(),
    url: joi.string().uri().min(15).max(100),
    repository: joi.string().uri().min(15).max(100),
  })
