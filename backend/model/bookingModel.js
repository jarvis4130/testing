const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  product: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Booking must belong to a Tour!"],
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User!"],
  },
  quantity: [
    {
      type: Number,
      require: [true, "Booking must have a quantity."],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "product",
    select: "name",
  });
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
