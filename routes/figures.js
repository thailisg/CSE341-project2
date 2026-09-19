const express = require('express');
const router = express.Router();

const figuresController = require('../controllers/figures')
const validation = require('../middleware/validate');

//route for get all figures
router.get('/', figuresController.getAll);

//route for get single figure
router.get('/:id', 
    validation.validateId,
    figuresController.getSingle
);

//route to Create a figure
router.post('/',
    validation.figureValidationRules(),
    validation.validate, 
    figuresController.createfigure
);

//route for update a figure
router.put('/:id', 
    validation.validateId,
    validation.figureValidationRules(),
    validation.validate,
    figuresController.updateSingleFigure
);

//route for delete a figure
router.delete('/:id', 
    validation.validateId,
    figuresController.deleteFigure
);

module.exports = router;