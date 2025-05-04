// models/product.model.js
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  stock: Number,
},{timestamps:true});
module.exports = mongoose.model('Product', productSchema);