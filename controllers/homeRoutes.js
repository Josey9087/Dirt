const router = require('express').Router();
const { Comment, Favorite, Houseplant, PlantPhoto ,Photo, Post, PostComment, User } = require('.././models')
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

// route to get all plants /plants
router.get('/', async (req,res) => {
  try {
      const plantData = await Houseplant.findAll();

      plants = plantData.map((plant) => plant.get({plain:true}));
      // res.status(200).json(plants)
      res.render('search', {plants});
  } catch (err) {
      res.status(500).json(err);
  }
});

// route to get a specific plant based off of name
router.get('/search/:name', async (req,res) => {
  console.log(req.params.name)
  // const { search } = await req.body;
 //  req.query
 // query params vs. request params
  try {
      const plantData = await Houseplant.findAll({
          // gets results similar to the query provided
          where: {
              [op.or]: {
                  name: { [op.like]: `%${req.params.name}%`},
                  scientific_name: { [op.like]: `%${req.params.name}%`}
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
      // plantData.then(plants => res.json(plants))
      if (!plantData) {
          return res.status(404).json({ message: 'No plant found with this name!' });
      }
      // maps data and trims excessive info
      plants = plantData.map((plant) => plant.get({plain:true}));
      // for development purposes use
      // res.status(200).json(plants);
      // instead of ->
      res.render('search', {plants});
  } catch (err) {
      res.status(400).json(err);
  }
})

// route to get all posts and sort by timestamp
router.get('/forum', async (req,res) => {
  try {
      const postData = await Post.findAll({
          include: [
              {
                  model: Photo,
                  attributes: ['url']
              }
          ],
          // order: '' use timestamps
      });

      const posts = postData.map((post) => post.get({plain: true}));

        res.render('posts', {posts})
      // res.status(200).json(posts)
  } catch (err) {
      res.status(500).json(err)
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