import Joi from '@hapi/joi';


export const registerValidation = (data) => {
    let schema;
    return schema = Joi.object({
        Receiver: Joi.string().min(6).max(255).required(),
        SendingAmount: Joi.string().min(1).max(50).required(),
        ConvertedAmount: Joi.string().min(1).max(50).required(),
        SendingCurrency: Joi.string().min(1).max(3).required(),
        ReceivingCurrency: Joi.string().min(1).max(3).required(),
    }).validate(data, schema);

    // return schema.validate(data, schema);

}