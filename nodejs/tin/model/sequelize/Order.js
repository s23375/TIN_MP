const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Order = sequelize.define('Order', {
    IDorder: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    datePlaced: {
        type: Sequelize.DATE,
        allowNull: false
    },
    clientContactInfo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shippingCompany: {
        type: Sequelize.STRING,
        allowNull: false
    },
    premiumDelivery: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Order;