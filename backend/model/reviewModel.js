const mongoose = require("mongoose");
const Product = require("./productModel");

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review cannot be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a Product."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a User."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

// only one user can review on one product
reviewSchema.index(
  { product: 1, user: 1 },
  {
    unique: true,
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });

  next();
});

// static method
reviewSchema.statics.calcAvgRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post("save", function () {
  // this.constructor is Review here
  this.constructor.calcAvgRatings(this.product);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.post(/^findOneAnd/, async function (doc) {
  // console.log(doc);
  await doc.constructor.calcAvgRatings(doc.product);
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
