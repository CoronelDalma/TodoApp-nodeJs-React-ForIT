const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    completed: Joi.boolean().default(false),
    createdAt: Joi.date().optional()
});

module.exports = taskSchema;
