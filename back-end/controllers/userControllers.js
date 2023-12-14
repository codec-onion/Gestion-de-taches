const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt")
const UserModel = require("../models/UserModel")

// exports.signup = (req, res, next) => {
//   bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//       const user = new UserModel({
//         email: req.body.email,
//         password: hash
//       })
//       user.save()
//         .then(() => res.status(201).json({ message: "Utilisateur créé avec succès" }))
//         .catch(error => res.status(400).json({ message: "Impossible de vous inscrire. Avez-vous déjà un compte?" }))
//     })
//     .catch(error => res.status(500).json({ error }))
// }

exports.isLogged = (req, res, next) => {
  return res.status(200).json({ message: "Vous êtes connecté" })
}

exports.login = (req, res, next) => {
  UserModel.findOne({ email: req.body.email })
    .then(user => {
    if(user === null) {
      return res.status(401).json({ message: "Nous n'avons pas pu vous identifier." })
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if(!valid) {
          return res.status(401).json({ message: "Nous n'avons pas pu vous identifier." })
        }
          res.status(200).json({
          userId: user._id,
          token: jwt.sign(
          { userId: user._id },
          `${process.env.PASSPHRASE}`,
          { expiresIn: "1h" }
        )
        })
      })
      .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}