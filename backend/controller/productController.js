const Product = require("../model/productModel");
const {
  factoryDeleteOne,
  factoryUpdateOne,
  factoryCreateOne,
  factoryGetOne,
  factoryGetAll,
} = require("./handleFactory");

const aliasTopProducts = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,-mrp";
  req.query.fields = "brandName,mrp,gender,images,priceAfterDiscount";
  next();
};

// @desc    Get clothes
// @route   GET /api/products
// @access  Public
const getAllProducts = factoryGetAll(Product);
// @desc    Get cloth
// @route   GET /api/products/:id
// @access  Public
const getProduct = factoryGetOne(Product, { path: "reviews" });

// @desc    Create products
// @route   POST /api/products
// @access  Private
const createProduct = factoryCreateOne(Product);

// @desc    Update products
// @route   PATCH /api/products/:id
// @access  Private
const updateProduct = factoryUpdateOne(Product);

// @desc    Delete products
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = factoryDeleteOne(Product);

module.exports = {
  aliasTopProducts,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
