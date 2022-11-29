const Manager = require('./Manager');
const Employee = require('./Employee');
const Task = require('./Task');

Manager.hasMany(Task,{
    foreignKey: 'manager_id'
});

Task.belongsTo(Manager, {
    foreignKey: 'manager_id',
    onDelete: 'cascade'
});

Employee.hasMany(Task, {
    foreignKey: 'employee_id'
});

Task.belongsTo(Employee, {
    foreignKey: 'employee_id',
    onDelete: 'cascade'
});

module.exports = {Manager, Employee, Task};