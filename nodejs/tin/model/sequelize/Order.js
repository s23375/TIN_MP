const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const {BOOLEAN} = require("sequelize");

const Order = sequelize.define('Order', {
    IDorder: {
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
    datePlaced: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "This field cannot be empty"
            },
            isDate: {
                msg: "This field has to be a date"
            }
        }
    },
    clientContactInfo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "This field cannot be empty"
            },
            isEmail: {
                msg: "The contact info has to be a valid e-mail address"
            }
        }
    },
    shippingCompany: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "This field cannot be empty"
            },
            isAlphanumeric: {
                msg: "This field has to be a String"
            }
        }
    },
    premiumDelivery: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "This field cannot be empty"
            },
            isBool(value) {
                if(!(value === true || value === false)) {
                    throw new Error("This field has to be either true or false")
                }
            }
        }
    }
});

module.exports = Order;