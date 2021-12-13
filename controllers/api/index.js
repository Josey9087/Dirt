const router = require('express').Router();
const plantRoutes = require('./plantRoutes');
const postRoutes = require('./postRoutes');
const uploadRoutes = require('./uploadRoutes')

router.use('/plants', plantRoutes);
router.use('/posts', postRoutes);
router.use('/', uploadRoutes);

module.exports = router;