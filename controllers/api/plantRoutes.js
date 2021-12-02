
const router = require('express').Router();
const { Comment, Favorite, Houseplant, Photo, Post, PostComment, User } = require('../../models');
const { Op } = require("sequelize");

// route to add plant to database (for developers only)
// perhaps render a form for devs to make it easier?
router.post('/', async (req,res) => {
    try {
        const plantData = await Houseplant.create(req.body);
        res.status(200).json(plantData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// route to get all plants /plants
router.get('/', async (req,res) => {
    try {
        const plantData = await Houseplant.findAll({
          include: 
            [{
                model:Photo, // may need another model to sperate houplant photos and forum photos
                attributes: ['url'],
            }]
          });

        plants = plantData.map((plant) => plant.get({plain:true}));

        res.render('plants', {plants});
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to get a single plant based off of id
router.get('/:id', async (req,res) => {
    try {
        const plantData = await Houseplant.findByPk({

        })
    } catch (err) {
        res.status(500).json(err);
    }
 })

// route to get a specific plant based off of name
router.get('/:name', async (req,res) => {
    try {
        const plantData = await Houseplant.findAll({
            // gets results similar to the query provided
            where: {
                name: {[Op.like]: `%${req.params.name}`}
            },
            limit: 10,
        });
        // maps data and trims excessive info
        plants = plantData.map((plant) => plant.get({plain:true}));

        res.render('search', {plants});
    } catch (err) {
        res.status(500).json(err);
    }
})