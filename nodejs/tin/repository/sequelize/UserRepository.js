const User = require('../../model/sequelize/User');

exports.getUsers = () => {
    return User.findAll();
};

exports.getUserByID = (IDuser) => {
    return User.findByPk(IDuser)
};

exports.createUser = (newUserData) => {
    return User.create({
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
        email: newUserData.email,
        password: newUserData.password
    });
};

exports.updateUser = (IDuser, userData) => {
    return User.update(userData, {where: {IDuser: IDuser}});
};

exports.deleteUser = (IDuser) => {
    return User.destroy({
        where: {IDuser: IDuser}
    });
};

exports.findByEmail = (email) => {
    return User.findOne({
        where: {email: email}
    });
};