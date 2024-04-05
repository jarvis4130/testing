const Review = require("../model/reviewModel");
const {
  factoryDeleteOne,
  factoryUpdateOne,
  factoryCreateOne,
  factoryGetOne,
  factoryGetAll,
} = require("./handleFactory");

const getAllReviews = factoryGetAll(Review);

const setProductUserIds = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user;
  next();
};

const getReview = factoryGetOne(Review);
const createReview = factoryCreateOne(Review);

//not to update password with this
const updateReview = factoryUpdateOne(Review);
const deleteReview = factoryDeleteOne(Review);

module.exports = {
  getAllReviews,
  createReview,
  getReview,
  deleteReview,
  updateReview,
  setProductUserIds,
};
