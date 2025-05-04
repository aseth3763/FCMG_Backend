const express = require("express")
const router = express.Router()
const authenticate  = require("../middlewares/authMiddleware")
const restrictTo = require("../middlewares/roleMiddleware")
const {createProduct,getProducts,updateProduct,deleteProduct} = require("../controllers/productController")

router.post("/createProduct",authenticate,restrictTo("admin"),createProduct)
router.get("/getProducts",getProducts)
router.put("/updateProduct/:id",authenticate,restrictTo("admin"),updateProduct)
router.delete("/deleteProduct/:id",authenticate,restrictTo("admin"),deleteProduct)

module.exports = router