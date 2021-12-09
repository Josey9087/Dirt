const router = require('express').Router();
const { Comment, Favorite, Houseplant, PlantPhoto ,Photo, Post, PostComment, User } = require('.././models')
const withAuth = require('../utils/auth');


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
      // res.status(200).json(plants)
      res.render('search', {plants});
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username']],
    });
    const users = userData.map((project) => project.get({ plain: true }));
    res.status(200).json("viewing your profile!")
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  try{
    res.status(200).json("right route")
  }catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;