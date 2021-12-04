const router = require('express').Router();
const { urlencoded } = require('express');
const { Comment, Favorite, Houseplant, Photo, Post, User } = require('../../models')

// route to add post
router.post('/', async (req,res) => {
    try {
        const postData = await Post.create(req.body);
        
        // redirects you to posts homepage
        res.redirect('/home')
    } catch (err) {
        res.status(500).json(err)
    }
});

// route to edit post
router.put('/:id', async (req,res) => {
    try {
        const postData = await Post.update(req.params.id, {})
    } catch (err) {
        res.status(500).json(err)
    }
});

// route to delete post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy(req.params.id, {})
    } catch (err) {
        res.status(500).json(err)
    }
});

// route to get all posts and sort by timestamp
router.get('/home', async (req,res) => {
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


        res.render('posts', posts)
    } catch (err) {
        res.status(500).json(err)
    }
});

// route to get a post , its image, user, and its comments based off of id
// this route will render a new page with the post and respective comments
router.get('/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
          },
          {
            model: Photo,
            attributes: ['url'],
          }
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.status(200).render('post', {
        ...post,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

