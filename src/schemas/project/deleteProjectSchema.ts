import joi from 'joi';

export default joi
  .object({
    project_id: joi.string().uuid().required(),
  })
