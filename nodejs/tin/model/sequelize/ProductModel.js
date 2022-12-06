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
        allowNull: false,
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
            }
        }
    },
    endDistributionDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isAfterProductionDate: function(endDistributionDate) {
                if(this.endDistributionDate && this.productionDate > this.endDistributionDate) {
                    throw new Error("End distribution date cannot be a date before the product's production date")
                }
            }
        }
    }
});

module.exports = ProductModel;