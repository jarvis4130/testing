const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: [true, "A cloth must have a brand name"],
    },
    slug: String,
    shortDescription: {
      type: String,
      required: [true, "A cloth should have a short description about it."],
    },
    mrp: {
      type: Number,
      required: [true, "A Cloth must have a price"],
    },
    priceAfterDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.mrp;
        },
        message: "Discount price ({VALUE}) should be below mrp price",
      },
    },
    productType: {
      type: String,
      required: [true, "A cloth must have a type"],
    },
    productDetails: {
      type: [String],
      required: [true, "A cloth should have a description."],
      trim: true,
    },
    materialCare: {
      type: [String],
    },
    specifications: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      required: [true, "Specifications are required for a product"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    images: [String],
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    // discountPercentage: {
    //   type: Number,
    // },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

productSchema.index({ mrp: 1, ratingsAverage: -1 });
productSchema.index({ slug: -1 });

productSchema.virtual("discountPercentage").get(function () {
  return Math.floor(((this.mrp - this.priceAfterDiscount) / this.mrp) * 100);
});

productSchema.virtual("bookingPrice").get(function () {
  return Math.floor(((this.priceAfterDiscount) * 10)/100);
});

// virtual populate
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

// productSchema.pre("save", function (next) {
//   const discountPercent = Math.floor(
//     ((this.mrp - this.priceAfterDiscount) / this.mrp) * 100
//   );
//   this.discountPercentage = discountPercent;
//   next();
// });

productSchema.pre("save", function (next) {
  this.slug = slugify(this.brandName, { lower: true });
  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "users",
    select: "-__v -passwordChangedAt",
  });
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
