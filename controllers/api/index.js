const router = require('express').Router();

const managerRoutes = require('./manager-routes.js');
const employeeRoutes = require('./employee-routes');
const taskRoutes = require('./task-routes.js');

router.use('/manager',managerRoutes);
router.use('/employee',employeeRoutes);
router.use('/task',taskRoutes);

module.exports = router;