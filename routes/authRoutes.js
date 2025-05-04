const express = require("express")
const Router = express.Router()
const {register ,userLogin} = require("../controllers/authController")

Router.post("/register",register)
Router.post("/userLogin",userLogin)


module.exports = Router;