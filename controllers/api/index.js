//imports all the api rotes and makes them ready for exports
const router = require('express').Router();

const managerRoutes = require('./manager-routes.js');
const employeeRoutes = require('./employee-routes');
const taskRoutes = require('./task-routes');

router.use('/manager',managerRoutes);
router.use('/employee',employeeRoutes);
router.use('/task',taskRoutes);

module.exports = router;