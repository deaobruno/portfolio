import joi from 'joi'

export default joi
  .object({
    project_id: joi.string().trim().uuid().required(),
    name: joi.string().trim().min(3).max(64),
    description: joi.string().trim().min(3).max(100),
    url: joi.string().trim().uri().min(15).max(100),
    repository: joi.string().trim().uri().min(15).max(100),
  })
