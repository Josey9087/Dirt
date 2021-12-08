const router = require('express').Router();
const plantRoutes = require('./plantRoutes');
const postRoutes = require('./postRoutes');

router.use('/plants', plantRoutes);
router.use('/posts', postRoutes);


module.exports = router;