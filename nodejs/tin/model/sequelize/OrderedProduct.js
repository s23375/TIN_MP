const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const OrderedProduct = sequelize.define('OrderedProduct', {
    IDorderedProduct: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        validate: {
            notEmpty: {
                msg: "The ID field with a certain name I will not give you here cannot be empty"
            },
            isInt: {
                msg: "The ID field has to be an Integer"
            }
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "This field cannot be empty"
            },
            isInt: {
                msg: "This field has to be an Integer type number"
            },
            isPositive(value) {
                if(parseInt(value) < 0) {
                    throw new Error("Price cannot be a negative")
                }
            }
        }
    },
    ProductModel_IDproduct: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The ID field with a certain name I will not give you here cannot be empty"
            },
            isInt: {
                msg: "The ID field has to be an Integer"
            }
        }
    },
    Order_IDorder: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The ID field with a certain name I will not give you here cannot be empty"
            },
            isInt: {
                msg: "The ID field has to be an Integer"
            }
        }
    }
});

module.exports = OrderedProduct;