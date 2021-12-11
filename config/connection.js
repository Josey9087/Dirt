const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(
        DB_NAME = "dirt_db",
        DB_USER = "root",
        DB_PASS = "",
        {
            host: '127.0.0.1',
            dialect: 'mysql',
        }
    );

module.exports = sequelize;