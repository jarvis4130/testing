const express = require("express");
const { protect, restrictTo } = require("../controller/authController");
const {
  getCheckoutSession,
  getMyProducts,
  createBookingsCheckout,
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = require("../controller/bookingController");
const router = express.Router();

router.use(protect);

router.get("/my-products", getMyProducts);
router.post("/checkout-session", getCheckoutSession);

router.use(restrictTo("admin"));

router
  .route('/')
  .get(getAllBookings)
  .post(createBooking);

router
  .route('/:id')
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

module.exports = router;
