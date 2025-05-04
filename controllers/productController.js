const Product = require('../models/productModel');

const createProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    if (!price || typeof price !== 'number' || price < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid product price is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Product category is required",
      });
    }

    if (stock === undefined || typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid stock value is required",
      });
    }

    const product = await Product.create({ name, price, category, stock });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// GET PRODUCTS WITH FILTER, SEARCH, PAGINATION
const getProducts = async (req, res) => {
  try {
    const { category, name, price, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (name) query.name = { $regex: name, $options: 'i' };
    if (price) query.price = price;

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateProduct = async(req,res)=>{
  try {
    const {id} = req.params
    if(!id){
      return res.status(400).json({
        success :  false,
        message : "Id is required"
      })
    }

    const product = await Product.findById(id)
    if(!product){
      return res.status(400).json({
        success : false,
        message : "Product not found"
      })
    }

    const { category, name, price,stock} = req.body;



    if(category){
      product.category = category
    }
    if(name){
      product.name = name
    }
    if(price){
      product.price = price
    }
    if(stock){
      product.stock = stock
    }

    await product.save()

    return res.status(200).json({
      success : true,
      message : "Product data updated successfully",
      data : product
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { createProduct , getProducts,updateProduct,deleteProduct};
