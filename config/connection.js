const Sequelize = require('sequelize');

//env file that holds all local credentials
require('dotenv').config();

let sequelize;

//uses either jawsdb server or local server to start database
if(process.env.JAWSDB_URL)
{
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}
else
{
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}


module.exports = sequelize;