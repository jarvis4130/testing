const express = require("express");
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setProductUserIds,
  getReview,
} = require("../controller/reviewController");
const { protect, restrictTo } = require("../controller/authController");
const router = express.Router({ mergeParams: true });

// POST product/:productId/reviews
// GET   product/:productId/reviews

router.use(protect);

router
  .route("/")
  .get(getAllReviews)
  .post(restrictTo("user"), setProductUserIds, createReview);

router
  .route("/:id")
  .delete(deleteReview)
  .patch(restrictTo("user", "admin"), updateReview)
  .get(restrictTo("user", "admin"), getReview);

module.exports = router;
