const router = require('express').Router();
const { urlencoded } = require('express');
const { Comment, Wishlist, Houseplant, Photo, Post, User } = require('../../models');

// route to add post
router.post('/', async (req,res) => {
    try {
        const postData = await Post.create(req.body);
        
        // redirects you to posts homepage
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
});

// route to add comment
router.post('/comment', async (req,res) => {
    try {
        const postData = await Comment.create(req.body);
        
        // redirects you to posts homepage
        console.log(postData)
        res.status(200).json(postData)
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
        const postData = await Post.destroy({
          where: {
            id: req.params.id
          }
        })
      res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/upload', (req,res) => {
    
})
module.exports = router;

