const UserRepository = require("../repository/sequelize/UserRepository");
const config = require("../config/auth/key")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    UserRepository.findByEmail(email)
        .then(user => {
            if(!user) {
                return res.status(401).send({message: "Incorrect email or password"})
            }

            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if(!isEqual) {
                        return res.status(401).send({message: "Incorrect email or password"})
                    }
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userID: user.IDuser
                        },
                        config.secret,
                        {expiresIn: "1h"}
                    )
                    res.status(200).json({ token: token, userID: user.IDuser })
                })
                .catch(err => {
                    console.log(err)
                    res.status(501)
                })
        })
}