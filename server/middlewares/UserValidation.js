import Joi from '@hapi/joi';


export const registerValidation = (data) => {
    let schema;
    return schema = Joi.object({
        userName: Joi.string().min(6).max(255).trim().required(),
        email: Joi.string().min(6).max(255).trim().required().email(),
        password: Joi.string().min(6).trim().required()
    }).validate(data, schema);

    // return schema.validate(data, schema);

}

export const loginValidation = (data) => {
    let schema;
    return schema = Joi.object({
        Email: Joi.string().min(6).max(255).trim().required().email(),
        Password: Joi.string().min(6).trim().required()
    }).validate(data, schema);

}

export const registerAdminValidation = (data) => {
    let schema;
    return schema = Joi.object({
        UserName: Joi.string().min(6).max(255).trim().required(),
        Email: Joi.string().min(6).max(255).trim().required().email(),
        Password: Joi.string().min(6).trim().required()
    }).validate(data, schema);

    // return schema.validate(data, schema);

}

export const loginAdminValidation = (data) => {
    let schema;
    return schema = Joi.object({
        Email: Joi.string().min(6).max(255).trim().required().email(),
        Password: Joi.string().min(6).trim().required()
    }).validate(data, schema);

}
