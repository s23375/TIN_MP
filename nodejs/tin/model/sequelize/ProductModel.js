const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ProductModel = sequelize.define('ProductModel', {
    IDproduct: {
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
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            // the downside of putting this error message here in this way: it displays only after all other errors in the form have been fixed
            // the upside: it works
            name: 'name',
            msg: "Name of the product has to be unique"
        },
        validate: {
            len: {
                args: [2, 60],
                msg: "This field should have from 2 to 60 characters"
            }
        }
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
        validate: {
            notEmpty: {
                msg: "This field cannot be empty"
            },
            isDecimal: {
              msg: "This field has to be a decimal type number"
            },
            len: {
                args: [1, 11],
                msg: "This field has to have from 1 to 11 numbers and signs"
            },
            isPositive(value) { // custom validator, it's cool tbh
                if(parseInt(value) < 0) {
                    throw new Error("Price cannot be a negative")
                }
            }
        }
    },
    productionDate: {
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
    endDistributionDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isDate: {
                msg: "This field has to be a date"
            },
            isAfterProductionDate: function(endDistributionDate) {
                if(this.endDistributionDate && this.productionDate > this.endDistributionDate) {
                    throw new Error("End distribution date cannot be a date before the product's production date")
                }
            }
        }
    }
});

module.exports = ProductModel;