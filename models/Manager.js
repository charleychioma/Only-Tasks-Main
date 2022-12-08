const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//bcrypt used for password incryption
class Manager extends Model {
    checkPassword(loginPw)
    {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

Manager.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        first_name :{
            type: DataTypes.STRING,
            allowNull: false
        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        }
    },

    {
        //hooks to execute the password encryption becore creating and updating users
        hooks: {
            
            async beforeCreate(newUserData)
            {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            async beforeUpdate(updatedUserData)
            {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }

        },

        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored:true,
        modelName: 'manager'
    }
);

module.exports = Manager;