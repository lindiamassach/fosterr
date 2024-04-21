// "use strict";

const Joi = require('joi');

const handleError = require('../helpers/validationError');


const validator = {};

validator.login = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 })
            .messages({
                'string.email': `Email should have the format "example@mail.com"`,
                'any.required': `Email is a required field`
            }),
        password: Joi.string().pattern(new RegExp('^\\S+$')).required()
            .messages({
                'string.pattern': 'Characters allowed are [a-zA-Z0-9_$#*.@]',
                'string.required': `"Phone no." is a required field`
            })
    }).with("email", "password");

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        handleError('login', error, res);
    } else {
        next();
    }
}

validator.register = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().pattern(/[a-zA-Z'-]+/).required()
            .messages({
                'string.base': `First name should be a type of 'text'`,
                'string.pattern.base': `First name should have the format "John"`,
                'string.empty': `First name is a required field`
            }),
        lastName: Joi.string().pattern(/[a-zA-Z'-]+/).required()
            .messages({
                'string.base': `Last name should be a type of 'text'`,
                'string.pattern.base': `Last name should have the format "Doe"`,
                'string.empty': `Last name is a required field`
            }),
        phoneNo: Joi.string().pattern(/\d+/).required()
        // (/^\((\d){3}\) (\d){3}\-(\d){4}$/).required()
            .messages({
                'string.pattern.base': `Phone number should have the format "(123) 456-7890"`,
                'string.empty': `Phone number is a required field`
            }),
        email: Joi.string().email({ minDomainSegments: 2 })
            .messages({
                'string.email': `Email should have the format "example@mail.com"`,
                'string.empty': `Email is a required field`
            }),
            savingsBal: Joi.string().pattern(/[a-z0-9\_\$\#\*\.\@]/).required()
            .messages({
                // 'string.base': `Savings Balance should be a type of 'number'`,
                // 'string.pattern.base': `Savings Balance should have the format "1000"`,
                'string.empty': `Savings Balance is a required field`
            }),
            checkingBal: Joi.string().pattern(/[a-z0-9\_\$\#\*\.\@]/).required()
            .messages({
                // 'string.base': `Checking Balance should be a type of 'number'`,
                // 'string.pattern.base': `Checking Balance should have the format "1000"`,
                'string.empty': `Checking Balance is a required field`
            }),
            address: Joi.string().required()
            .messages({
                'string.base': `Address should be a type of 'text'`,
                'string.empty': `Address is a required field`
            }),
        password: Joi.string().pattern(/[a-z0-9\_\$\#\*\.\@]/).min(8).required()
            .messages({
                'string.pattern': 'Characters allowed are [a-zA-Z0-9_$#*.@]',
                'string.required': `"Password" is a required field`
            }),
        confirmPassword: Joi.ref('password')
        // .message({
        //     'any.only': 'Password MUST match confirm Password.'
        // })
    }).with("password", 'confirmPassword');

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        handleError('signup', error, res);
    } else {
        next();
    }
}

module.exports = validator;