const { body, validationResult } = require('express-validator');
const ObjectId = require('mongodb').ObjectId;

const figureValidationRules = () => {
    return [
        // Name must not be empty and must be a string
        body('name')
            .notEmpty()
            .isString(),
        // Alternative name must not be empty and must be a string
        body('alternativeName')
            .notEmpty()
            .isString(),
        // Gender must not be empty and must be a string
        body('gender')
            .notEmpty()
            .isString(),
        // Title must not be empty and must be a string
        body('title')
            .notEmpty()
            .isString(),
        // Period must not be empty and must be a string
        body('period')
            .notEmpty()
            .isString(),
        // Time must not be empty and must be a string
        body('time')
            .notEmpty()
            .isString(),
        // Description must not be empty and must be a string
        body('description')
            .notEmpty()
            .isString(),
        // Certainty level must not be empty and must be an integer
        body('certaintyLevel')
            .notEmpty()
            .isInt(),
        // Sources must not be empty and must be an array
        body('sources')
            .notEmpty()
            .isArray()
    ]
};

const artifactValidationRules = () => { 
    return [ 
        // Name must not be empty and must be a string 
        body('name') 
            .notEmpty() 
            .isString(), 
        // Alternative name must not be empty and must be a string 
        body('alternativeName') 
            .notEmpty() 
            .isString(), 
        // Type must not be empty and must be a string 
        body('type') 
            .notEmpty() 
            .isString(), 
        // Period must not be empty and must be a string 
        body('period') 
            .notEmpty() 
            .isString(), 
        // Date must not be empty and must be a string 
        body('date') 
            .notEmpty() 
            .isString(), 
        // Place found must not be empty and must be a string 
        body('placeFound') 
            .notEmpty() 
            .isString(), 
        // Description must not be empty and must be a string 
        body('description') 
            .notEmpty()
            .isString(), 
        // Associated figures must not be empty and must be an array 
        body('associatedFigures') 
            .notEmpty() 
            .isArray(), 
        // Certainty level must not be empty and must be an integer 
        body('certaintyLevel') 
            .notEmpty() 
            .isInt(), 
        // Sources must not be empty and must be an array 
        body('sources') 
            .notEmpty() 
            .isArray() 
    ] 
};

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
};

const validateId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: 'Invalid ID'
        });
    }
    next();
}


module.exports = {
  figureValidationRules,
  artifactValidationRules,
  validate,
  validateId
}