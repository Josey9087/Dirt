
const router = require('express').Router();
const { Houseplant } = require('../../models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

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

// route to get a single plant based off of id
router.get('/profile/:id', async (req,res) => {
    try {
        const plantData = await Houseplant.findByPk(req.params.id);

        if (!plantData) {
            return res.status(404).json({ message: 'No plant found with this id!' });
        }

        const plants = plantData.get({plain: true})
        res.status(200).json(plants);
        // res.render('plant', {plants});
    } catch (err) {
        res.status(400).json(err);
    }
 })

 // route to delete a single plant based off of id
 // developers only
router.delete('/:id', async (req,res) => {
    try {
        const plantData = await Houseplant.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!plantData) {
            return res.status(404).json({ message: 'No plant found with this id!' });
        }
        res.status(200).json(plantData);
    } catch (err) {
        res.status(400).json(err);
    }
 })

// route to get plants in database based off of low water level
router.get('/search/low-water', async (req,res) => {
    try {
        const plantData = await Houseplant.findAll({
            // gets results similar to the query provided
            where: {
                [op.or]: {
                    water: 1,
                    water: 2
                }
                    
            },
            limit: 30,
        });
        // maps data and trims excessive info
        plants = plantData.map((plant) => plant.get({plain:true}));
        // for development purposes use
        res.status(200).json(plants);
        // instead of ->
        // res.render('search', {plants});
    } catch (err) {
        res.status(400).json(err);
    }
})

// route to get plants in database based off of medium water level
router.get('/search/medium-water', async (req,res) => {
    try {
        const plantData = await Houseplant.findAll({
            // gets results similar to the query provided
            where: {
                [op.or]: {
                    water: 3,
                    water: 4
                }
                    
            },
            limit: 30,
        });
        // maps data and trims excessive info
        plants = plantData.map((plant) => plant.get({plain:true}));
        // for development purposes use
        res.status(200).json(plants);
        // instead of ->
        // res.render('search', {plants});
    } catch (err) {
        res.status(400).json(err);
    }
})

// route to get plants in database based off of high water level
router.get('/search/high-water', async (req,res) => {
    try {
        const plantData = await Houseplant.findAll({
            // gets results similar to the query provided
            where: {
                water: 5        
            },
            limit: 30,
        });
        // maps data and trims excessive info
        plants = plantData.map((plant) => plant.get({plain:true}));
        // for development purposes use
        res.status(200).json(plants);
        // instead of ->
        // res.render('search', {plants});
    } catch (err) {
        res.status(400).json(err);
    }
})

// route to get plants in database based off of low sunlight level
router.get('/search/low-sun', async (req,res) => {
    try {
        const plantData = await Houseplant.findAll({
            // gets results similar to the query provided
            where: {
                [op.or]: {
                    sunlight: 1,
                    sunlight: 2
                }
                    
            },
            limit: 30,
        });
        // maps data and trims excessive info
        plants = plantData.map((plant) => plant.get({plain:true}));
        // for development purposes use
        res.status(200).json(plants);
        // instead of ->
        // res.render('search', {plants});
    } catch (err) {
        res.status(400).json(err);
    }
})

// route to get plants in database based off of medium sunlight level
router.get('/search/medium-sun', async (req,res) => {
    try {
        const plantData = await Houseplant.findAll({
            // gets results similar to the query provided
            where: {
                [op.or]: {
                    sunlight: 3,
                    sunlight: 4
                }
                    
            },
            limit: 30,
        });
        // maps data and trims excessive info
        plants = plantData.map((plant) => plant.get({plain:true}));
        // for development purposes use
        res.status(200).json(plants);
        // instead of ->
        // res.render('search', {plants});
    } catch (err) {
        res.status(400).json(err);
    }
})

// route to get plants in database based off of high sunlight level
router.get('/search/high-sun', async (req,res) => {
    try {
        const plantData = await Houseplant.findAll({
            // gets results similar to the query provided
            where: {
                sunlight: 5       
            },
            limit: 30,
        });
        // maps data and trims excessive info
        plants = plantData.map((plant) => plant.get({plain:true}));
        // for development purposes use
        res.status(200).json(plants);
        // instead of ->
        // res.render('search', {plants});
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;