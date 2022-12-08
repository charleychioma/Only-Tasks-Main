const Manager = require('./Manager');
const Employee = require('./Employee');
const Task = require('./Task');

//many to one relationship between the task and manager tables
Manager.hasMany(Task,{
    foreignKey: 'manager_id'
});

Task.belongsTo(Manager, {
    foreignKey: 'manager_id',
    onDelete: 'cascade'
});

//many to one relationship between the task and employee table
Task.belongsTo(Employee, {
    foreignKey: 'employee_id',
    onDelete: 'cascade'
});

// Task.belongsTo(Employee, {
//     foreignKey: 'employee_id',
//     onDelete: 'cascade'
// });

module.exports = {Manager, Employee, Task};