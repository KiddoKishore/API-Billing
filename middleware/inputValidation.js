import Joi from 'joi';

const inputValidation = (req ,res, next) =>{
      
      const schema = Joi.object({
        api: Joi.object().pattern(
            Joi.string(),
            Joi.object().pattern(
              Joi.string(),
              Joi.number().positive()
            )
          ),
        statusCode: Joi.array().items(Joi.number()).required(),
        fileName: Joi.string().required().regex(/\.csv$/)
      }).required()

      const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.message
        })
    } else {
    next();
    }
}

export { inputValidation }