import Joi from "joi";

export const signUpValidation = Joi.object ({
    name:Joi.string().alphanum().min(3).max(20).required(),
    email:Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'boxmail'] } }),
    password : Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).messages({
        'string.pattern.base': 'Invalid format. password Format should be start with lowercase or uppercase or number and the length shouid be from three digit to thirty digits'
    }),
    rePassword:Joi.any().valid(Joi.ref('password')).messages({
        'any.only': 'redPasswords do not match'
    }),
    phone:Joi.number().integer().min(11).max(11)
})
