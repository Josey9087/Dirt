const router = require('express').Router();
const plantRoutes = require('./plantRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

router.use('/plants', plantRoutes);
router.use('/posts', postRoutes);
router.use('/user', userRoutes);


module.exports = router;