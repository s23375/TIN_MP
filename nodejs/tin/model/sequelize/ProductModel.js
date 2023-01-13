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
                msg: "notEmpty"
            },
            isInt: {
                msg: "isInt"
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
            msg: "isUniqueName"
        },
        isAlpha: {
          args: true,
          msg: "isAlpha"
        },
        validate: {
            len: {
                args: [2, 60],
                msg: "len_2_60"
            },
            notEmpty: {
                msg: "notEmpty"
            }
        }
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDecimal: {
              msg: "isDecimal"
            },
            len: {
                args: [1, 11],
                msg: "len_1_11"
            },
            isPositive(value) { // custom validator, it's cool tbh
                if(parseInt(value) < 0) {
                    throw new Error("isPositive")
                }
            }
        }
    },
    productionDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDate: {
                msg: "isDate"
            }
        }
    },
    endDistributionDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isDate: {
                msg: "isDate"
            },
            isAfterProductionDate: function(endDistributionDate) {
                if(this.endDistributionDate && this.productionDate > this.endDistributionDate) {
                    throw new Error("endDistributionDate")
                }
            }
        }
    }
});

module.exports = ProductModel;