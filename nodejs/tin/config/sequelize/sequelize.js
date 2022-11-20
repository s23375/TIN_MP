const Sequelize = require('sequelize');

const sequelize = new Sequelize('myDatabase', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;