const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const OrderedProduct = sequelize.define('OrderedProduct', {
    IDorderedProduct: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ProductModel_IDproduct: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Order_IDorder: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = OrderedProduct;