const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//function to get all figures
const getAll = async (req, res, next) => {
    try{
        console.log("ENTRÉ A GET ALL");
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('historicalFigure')
            .find();
        const historicalFigure = await result.toArray();

        res.setHeader('content-Type', 'application/json'); 
        res.status(200).json(historicalFigure);

    }catch (error){
        next(error);
    }
}

//function to get a single figure
const getSingle = async (req, res, next) => {
    try{
        console.log("ENTRÉ A GET SINGLE");
        console.log("ID:", req.params.id);

        const figureId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('historicalFigure')
            .find({_id: figureId});

    
        const historicalFigure = await result.toArray();

        if (historicalFigure.length === 0) { 
            res.status(404).json("Figure not found"); 
        } else { 
            res.setHeader('content-Type', 'application/json'); 
            res.status(200).json(historicalFigure[0]); 
        }
        
    }catch (error){
        next(error);
    }
}

//function to create a new figure
const createfigure = async (req, res, next) => {
    try{
        console.log("ENTRÉ A CREAR NUEVA FIGURA");

        const figure = {
            name: req.body.name,
            alternativeName: req.body.alternativeName,
            gender: req.body.gender,
            title: req.body.title,
            period: req.body.period,
            time: req.body.time,
            description: req.body.description,
            certaintyLevel: req.body.certaintyLevel,
            sources: req.body.sources
        };

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('historicalFigure')
            .insertOne(figure);

        res.status(200).json({
            message: 'Figure created successfully',
            figureId: result.insertedId
        });
    }catch (error){
        next(error);
    }
};

//Function to Update a single figure
const updateSingleFigure = async (req, res, next) => {
    try{
        console.log("ENTRÉ A UPDATE SINGLE");
        console.log("ID:", req.params.id);

        const figureId = new ObjectId(req.params.id);

        const figure = {
            name: req.body.name,
            alternativeName: req.body.alternativeName,
            gender: req.body.gender,
            title: req.body.title,
            period: req.body.period,
            time: req.body.time,
            description: req.body.description,
            certaintyLevel: req.body.certaintyLevel,
            sources: req.body.sources
        }

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('historicalFigure')
            .replaceOne({ _id: figureId }, figure);

        if (result.matchedCount === 0) { 
            res.status(404).json("Figure not found"); 
        } else { 
            res.status(200).send(); 
        }
    }catch (error){
        next(error);
    }
}

//Function to Delete a single figure
const deleteFigure = async (req, res, next) => {
    try{
        console.log("ENTRÉ A DELETE SINGLE");
        console.log("ID:", req.params.id);

        const figureId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('historicalFigure')
            .deleteOne({ _id: figureId });

        if (result.deletedCount === 1) { 
            res.status(200).send(); 
        } else { 
            res.status(404).json("Figure not found"); 
        }
    }catch (error){
        next(error);
    }
}

module.exports = {
    getAll,
    getSingle,
    createfigure,
    updateSingleFigure,
    deleteFigure
};