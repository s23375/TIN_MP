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
    }
});

module.exports = ProductModel;