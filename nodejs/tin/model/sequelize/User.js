const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const User = sequelize.define("User", {
    IDuser: {
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
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: {
            args: true,
            msg: "this appears to not work and I have no idea why"
        },
        validate: {
            len: {
                args: [2, 60],
                msg: "This field should have from 2 to 60 characters"
            }
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: {
            args: true,
            msg: "this appears to not work and I have no idea why"
        },
        validate: {
            len: {
                args: [2, 60],
                msg: "This field should have from 2 to 60 characters"
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: {
            args: true,
            msg: "this appears to not work and I have no idea why"
        },
        unique: {
            name: 'email',
            msg: "This email is already registered"
        },
        validate: {
            isEmail: {
                msg: "This has to be an email!"
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: {
            args: true,
            msg: "this appears to not work and I have no idea why"
        },
        validate: {
            len: {
                args: [2, 60],
                msg: "This field should have from 2 to 60 characters"
            }
        }
    }
});

module.exports = User;