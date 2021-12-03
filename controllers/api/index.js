const router = require('express').Router();
const plantRoutes = require('./plantRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');
const photoRoutes = require('./photoRoutes');

router.use('/plants', plantRoutes);
router.use('/posts', postRoutes);
router.use('/user', userRoutes);
router.use('/photo', photoRoutes);


module.exports = router;