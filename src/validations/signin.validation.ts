import Joi from "joi";

export const logInValidation = Joi.object ({
    email:Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'boxmail'] } }),
    password : Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).messages({
        'string.pattern.base': 'Invalid format. password Format should be start with lowercase or uppercase or number and the length shouid be from three digit to thirty digits'
    })
})

