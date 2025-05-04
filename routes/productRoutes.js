const express = require("express")
const router = express.Router()
const {createProduct,getProducts,updateProduct,deleteProduct} = require("../controllers/productController")

router.post("/createProduct",createProduct)
router.get("/getProducts",getProducts)
router.put("/updateProduct/:id",updateProduct)
router.delete("/deleteProduct/:id",deleteProduct)

module.exports = router