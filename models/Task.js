const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        deadline: {
            type: DataTypes.DATE,
            allowNull: false
        },
        
        // manager_id : {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'manager',
        //         key: 'id'
        //     }
        // },

        // employee_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'employee',
        //         key: 'id'
        //     }
        // }
    },

    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'task'
    }
);

module.exports = Task;