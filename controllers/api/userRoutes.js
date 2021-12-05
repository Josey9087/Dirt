
const router = require('express').Router();
const { Comment, Favorite, Houseplant, Photo, Post, PostComment, User } = require('../../models')

// route to add user
router.post('/', async (req, res) => {
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

    res.json({ user: userData, message: 'You are now logged in!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET a user
router.get('/:id', async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id);
      if (!userData) {
        res.status(404).json({ message: 'No user with this id!' });
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
// route to delete user

// route to check login credentials and start session if they exist

// route to destroy session when logged out

module.exports = router;
