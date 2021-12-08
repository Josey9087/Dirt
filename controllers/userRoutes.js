
const router = require('express').Router();
const { Comment, Favorite, Houseplant, Photo, Post, PostComment, User } = require('../models')

// route to add user
router.post('/user', async (req, res) => {
  try {
    const userData = await User.findOne({where: {email: req.body.email}});
    if(userData){
      res
        .status(400)
        .json({ message:'User already exists please login'});
      return;
    }
      const usercreateData = await User.create(req.body);
      res.status(200).json(usercreateData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// route to change user? future development? perhaps create a profile page...
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: req.session.user_id, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json("its something else");
  }
});

//Logout
router.post('/logout', async (req, res) => {
  try{ const userData = await User.findOne({ where: { email: req.body.email } });
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(200).json("logged out");
    });
  } else {
    res.status(200).json("something went wrong")
  }
  } catch (err) {
    res.status(400).json("its something else");
  }
});

// GET a user
router.get('/:id', async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id);
      if (!userData) {
        res.status(404).json({ message: 'defualting to get route instead of login!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // UPDATE a user
  router.put('/:id', async (req, res) => {
    try {
      const userData = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!userData[0]) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE a user
  router.delete('/:id', async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!userData) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      res.status(200).json(`user number ${req.params.id} has been deleted`);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// route to check login credentials and start session if they exist
router.get('/login', async (req, res) => {
  res.status(200).json("good route!")
});
// route to destroy session when logged out

module.exports = router;