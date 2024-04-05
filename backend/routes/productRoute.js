const express = require("express");
const router = express.Router();
const {
  aliasTopProducts,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controller/productController");
const { protect, restrictTo } = require("../controller/authController");
const reviewRouter = require("./reviewRoute");
const { createBookingsCheckout } = require("../controller/bookingController");

router.use("/:productId/reviews", reviewRouter);

router.route("/top-5-best").get(aliasTopProducts, getAllProducts);

router
  .route("/")
  .get(createBookingsCheckout , getAllProducts)
  .post(protect, restrictTo("admin", "seller"), createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(protect, restrictTo("admin", "seller"),updateProduct)
  .delete(protect, restrictTo("admin", "manager"), deleteProduct);

module.exports = router;
