const mongodb = require('../data/database'); 
const ObjectId = require('mongodb').ObjectId; 

// Function to get all artifacts 
const getAll = async (req, res, next) => { 
    try { 
        console.log("ENTRÉ A GET ALL ARTIFACTS"); 

        throw new Error('TEST ERROR 500');

        const result = await mongodb 
            .getDatabase() 
            .db() 
            .collection('artifacts') 
            .find(); const artifacts = await result.toArray();
            
        res.setHeader('content-Type', 'application/json'); 
        res.status(200).json(artifacts); 

    } catch (error) { 
        next(error); 
    } 
}; 

// Function to get a single artifact 
const getSingle = async (req, res, next) => { 
    try { 
        console.log("ENTRÉ A GET SINGLE ARTIFACT"); 
        console.log("ID:", req.params.id); 

        const artifactId = new ObjectId(req.params.id);

        const result = await mongodb 
            .getDatabase() 
            .db() 
            .collection('artifacts') 
            .find({ _id: artifactId }); 
            
        const artifacts = await result.toArray(); 
        
        if (artifacts.length === 0) { 
            res.status(404).json("Artifact not found"); 
        } else { 
            res.setHeader('content-Type', 'application/json'); 
            res.status(200).json(artifacts[0]); 
        } 
    } catch (error) { 
        next(error); 
    } 
}; 

// Function to create a new artifact 
const createArtifact = async (req, res, next) => { 
    try { 
        console.log("ENTRÉ A CREAR NUEVO ARTIFACT"); 
        
        const artifact = { 
            name: req.body.name, 
            alternativeName: req.body.alternativeName, 
            type: req.body.type, 
            period: req.body.period, 
            date: req.body.date, 
            placeFound: req.body.placeFound, 
            description: req.body.description, 
            associatedFigures: req.body.associatedFigures, 
            certaintyLevel: req.body.certaintyLevel, 
            sources: req.body.sources 
        }; 
        
        const result = await mongodb 
            .getDatabase() 
            .db() 
            .collection('artifacts') 
            .insertOne(artifact); 
            
        res.status(200).json({ 
            message: 'Artifact created successfully', 
            artifactId: result.insertedId 
        }); 

    } catch (error) { 
        next(error); 
    } 
}; 

// Function to update a single artifact 
const updateSingleArtifact = async (req, res, next) => { 
    try { 
        console.log("ENTRÉ A UPDATE SINGLE ARTIFACT"); 
        console.log("ID:", req.params.id); 
        
        const artifactId = new ObjectId(req.params.id); 
        
        const artifact = { 
            name: req.body.name, 
            alternativeName: req.body.alternativeName, 
            type: req.body.type, 
            period: req.body.period, 
            date: req.body.date, 
            placeFound: req.body.placeFound, 
            description: req.body.description, 
            associatedFigures: req.body.associatedFigures, 
            certaintyLevel: req.body.certaintyLevel, 
            sources: req.body.sources 
        }; 
        
        const result = await mongodb 
            .getDatabase() 
            .db() 
            .collection('artifacts') 
            .replaceOne({ _id: artifactId }, artifact); 
            
        if (result.matchedCount === 0) { 
            res.status(404).json("Artifact not found"); 
        } else { 
            res.status(200).send(); 
        } 
    } catch (error) { 
        next(error); 
    } 
}; 

// Function to delete a single artifact 
const deleteArtifact = async (req, res, next) => { 
    try { 
        console.log("ENTRÉ A DELETE ARTIFACT"); 
        console.log("ID:", req.params.id); 
        
        const artifactId = new ObjectId(req.params.id); 
        const result = await mongodb 
            .getDatabase() 
            .db() 
            .collection('artifacts') 
            .deleteOne({ _id: artifactId }); 
        
        if (result.deletedCount === 1) { 
            res.status(200).send(); 
        } else { 
            res.status(404).json("Artifact not found"); 
        } 
    } catch (error) { 
        next(error); 
    } 
}; 

module.exports = { 
    getAll, 
    getSingle, 
    createArtifact, 
    updateSingleArtifact, 
    deleteArtifact 
};