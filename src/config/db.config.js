const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Added this line
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 60000, // Increase timeout to 60 seconds
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000,
    },
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('✅ Database connected successfully!'))
    .catch(err => console.error('❌ Database connection error:', err));

module.exports = { sequelize, DataTypes };
