import Joi from "joi";

export function validateNewGroup(body) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(20).required(),
    description: Joi.string().min(3).max(250).optional(),
  });
  return schema.validate(body);
}

export function validateEditGroup(body) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(20).optional(),
    description: Joi.string().min(3).max(250).optional(),
    tags: Joi.array().length(20).items(Joi.string().max(5)).optional(),
  });
  return schema.validate(body);
}

export function validateAddMember(body) {
  const schema = Joi.object({
    memberId: Joi.string().required(),
  });
  return schema.validate(body);
}
