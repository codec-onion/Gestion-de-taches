const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt")
const UserModel = require("../models/UserModel")

exports.signup = async (req, res, next) => {
 try {
    const hash = await bcrypt.hash(req.body.password, 10)
  
    const user = new UserModel({
      email: req.body.email,
      password: hash,
    })
  
    await user.save()
  
    res.status(201).json({ message: "Utilisateur créé avec succès" })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Impossible de vous inscrire. Avez-vous déjà un compte?" })
    }
    res.status(500).json(error)
  }
}

exports.login = async (req, res, next) => {

  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user === null) {
      return res.status(401).json({ message: "Nous n'avons pas pu vous identifier." })
    }
    const valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) {
      return res.status(401).json({ message: "Nous n'avons pas pu vous identifier." })
    }
    const token = jwt.sign(
      { userId: user._id },
      `${process.env.PASSPHRASE}`,
      { expiresIn: "1h" }
    )
    res.status(200).json({ userId: user._id, token })
  } catch (error) {
    res.status(500).json(error);
  }
}
  
exports.isLogged = (req, res, next) => {
  return res.status(200).json({ message: "Vous êtes connecté" })
}