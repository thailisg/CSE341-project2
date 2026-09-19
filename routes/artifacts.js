const express = require('express'); 
const router = express.Router(); 

const artifactsController = require('../controllers/artifacts') 
const validation = require('../middleware/validate'); 

//route for get all artifacts 
router.get('/', artifactsController.getAll); 

//route for get single artifact 
router.get('/:id', 
    validation.validateId, 
    artifactsController.getSingle
); 

//route to Create an artifact 
router.post('/', 
    validation.artifactValidationRules(), 
    validation.validate, 
    artifactsController.createArtifact
); 

//route for update an artifact 
router.put('/:id', 
    validation.validateId, 
    validation.artifactValidationRules(), 
    validation.validate, 
    artifactsController.updateSingleArtifact
); 

//route for delete an artifact 
router.delete('/:id', 
    validation.validateId, 
    artifactsController.deleteArtifact
); 

module.exports = router;