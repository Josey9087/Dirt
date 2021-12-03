
const router = require('express').Router();
const {PlantPhoto, Houseplant } = require('../../models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const operatorsAliases = {
    $eq: op.eq,
    $like: op.like,
}

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
                model:PlantPhoto,
                attributes: ['url'],
            }]
          });

        plants = plantData.map((plant) => plant.get({plain:true}));
        // for testing purposes use 
          res.status(200).json(plants)
        // instead of 
        // res.render('plants', {plants});
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to get a single plant based off of id
router.get('/profile/:id', async (req,res) => {
    try {
        const plantData = await Houseplant.findByPk(req.params.id, {
            include: [
                {
                    model: PlantPhoto,
                    attributes: ['url'],
                }
            ]
        });

        if (!plantData) {
            return res.status(404).json({ message: 'No plant found with this id!' });
        }

        const plants = plantData.get({plain: true})

        res.status(200).json(plants);
    } catch (err) {
        res.status(500).json(err);
    }
 })

 // route to delete a single plant based off of id
router.delete('/:id', async (req,res) => {
    try {
        const plantData = await Houseplant.destroy(req.params.id);

        if (!plantData) {
            return res.status(404).json({ message: 'No plant found with this id!' });
        }

        res.status(200).json(plantData);
    } catch (err) {
        res.status(500).json(err);
    }
 })

// route to get a specific plant based off of name
router.get('/search', async (req,res) => {
    const { search } = '';
    // const { search } = await req.body;
    try {
        const plantData = await Houseplant.findAll({
            // gets results similar to the query provided
            where: {
                name: {
                    $eq: `%Pothos%`,
                }
            },
            include: [
                {
                    model:PlantPhoto,
                    attributes: ['url'],
                }
            ],
            limit: 10,
        });

        if (!plantData) {
            return res.status(404).json({ message: 'No plant found with this name!' });
        }
        // maps data and trims excessive info
        plants = plantData.map((plant) => plant.get({plain:true}));

        // for development purposes use
        res.status(200).json(plants);
        // instead of ->
        // res.render('search', {plants});
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;