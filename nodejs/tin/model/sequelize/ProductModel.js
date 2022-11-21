const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ProductModel = sequelize.define('ProductModel', {
    IDproduct: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    productionDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    endDistributionDate: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

module.exports = ProductModel;