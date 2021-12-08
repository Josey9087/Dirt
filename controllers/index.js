const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')
const userRoutes = require('./userRoutes')

router.use('/api', apiRoutes);
router.use('/home', homeRoutes);
router.use('/', userRoutes);

module.exports = router;