const router = require('express').Router();
const { Comment, Favorite, Houseplant ,Photo, Post, User } = require('.././models')
const withAuth = require('../utils/auth');
// const pageNum = require('../utils/page');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
let offset = 0;

// route to get all plants /plants
router.get('/home', async (req,res) => {
  try {
      const plantData = await Houseplant.findAll({
        limit: 20,
        offset: offset,
      });

      plants = plantData.map((plant) => plant.get({plain:true}));
      // res.status(200).json(plants)
      res.render('search', {plants});
  } catch (err) {
      res.status(500).json(err);
  }
});

// route to get a single plant based off of id
router.get('/plant/:id', async (req,res) => {
  try {
      const plantData = await Houseplant.findByPk(req.params.id);
      if (!plantData) {
          return res.status(404).json({ message: 'No plant found with this id!' });
      }
      const plant = plantData.get({plain: true})
      // res.status(200).json(plants);
      res.render('plant', {plant});
  } catch (err) {
      res.status(400).json(err);
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

router.get('/forum', async (req,res) => {
  try {
    const postData = await Post.findAll()
    const posts = postData.map((post) => post.get({plain: true}))

    res.render('posts', {posts})
  } catch (err) {
    res.status(400).json(err)
  }
})

// route to get a post , its image, user, and its comments based off of id
// this route will render a new page with the post and respective comments
router.get('/forum/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    const commentData = await Comment.findAll({
      where: {post_id: req.params.id}
    });
    const post = postData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({plain: true}));

    // res.status(200).json(post)
    res.status(200).render('post', {
      ...post,
      comments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/upload', withAuth, async (req,res) => {
  res.render('upload')
})

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;