import joi from 'joi'

export default joi
  .object({
    project_id: joi.string().uuid().required(),
    name: joi.string().min(3).max(64),
    description: joi.string().min(3).max(100),
    url: joi.string().uri().min(15).max(100),
    repository: joi.string().uri().min(15).max(100),
  })
