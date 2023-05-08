const router = require('express').Router();
//take information from this file
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

//use routes to get there
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);


router.use((req, res) => {
    res.status(404).end();
});

// use router in other file
module.exports = router;