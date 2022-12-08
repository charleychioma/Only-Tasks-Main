//imports all the api and html routes, sets api rotes after /api
const router = require('express').Router();

const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes.js');
const employeeDash = require('./employee-dashboard');


router.use('/api',apiRoutes);
router.use('/',homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/employee-dashboard',employeeDash);


router.use((req,res)=>{
    res.status(404).end();
});

module.exports = router;