const express = require('express');
const router = express.Router();

const figuresController = require('../controllers/figures')
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate")

//route for get all figures
router.get('/', figuresController.getAll);

//route for get single figure
router.get('/:id', 
    validation.validateId,
    figuresController.getSingle
);

//route to Create a figure
router.post('/',
    isAuthenticated,
    validation.figureValidationRules(),
    validation.validate, 
    figuresController.createfigure
);

//route for update a figure
router.put('/:id', 
    isAuthenticated,
    validation.validateId,
    validation.figureValidationRules(),
    validation.validate,
    figuresController.updateSingleFigure
);

//route for delete a figure
router.delete('/:id', 
    isAuthenticated,
    validation.validateId,
    figuresController.deleteFigure
);

module.exports = router;