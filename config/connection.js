const Sequelize = require('sequelize');
//DotEnv is a lightweight npm package that automatically loads environment variables from a .env file
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    //adds sequelize
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3307
    });
}
//use sequelize in other files
module.exports = sequelize;