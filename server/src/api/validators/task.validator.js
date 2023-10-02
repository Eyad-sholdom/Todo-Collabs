import Joi from "joi";

export function validateTask(body) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).optional().empty(""),
    priority: Joi.string().valid("high", "medium", "low").optional().empty(""),
    tags: Joi.array().items(Joi.string()).optional().empty(""),
    assignedTo: Joi.string().optional().empty(""),
  });
  return schema.validate(body);
}
