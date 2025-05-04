const express = require("express")
const router = express.Router()
const {getAllUsers} = require("../controllers/userController")
const authenticate  = require("../middlewares/authMiddleware")
const restrictTo = require("../middlewares/roleMiddleware")

router.get("/getAllUsers",authenticate,restrictTo("admin"),getAllUsers)

module.exports = router