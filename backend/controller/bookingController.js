const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
const {
  factoryDeleteOne,
  factoryUpdateOne,
  factoryCreateOne,
  factoryGetOne,
  factoryGetAll,
} = require("./handleFactory");
const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const Booking = require("../model/bookingModel");

const getCheckoutSession = asyncHandler(async (req, res, next) => {
  // 1)Get the currently booked product
  const { products } = req.body;

  // 2)Create checkout session
  //    change url in development
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: `${product.brand} Product`,
        images: [`${req.protocol}://${req.get(
          "host"
        )}/${product.img}`],
      },
      unit_amount: product.unitPrice * 100,
    },
    quantity: product.quantity,
  }));
  const productIds = products.map((product) => product.productId);
  const productQuantity = products.map((product) => product.quantity);
  // console.log(productQuantity);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${req.protocol}://${req.get(
      "host"
    )}/api/products?user=${
      req.user._id
    }&product=${productIds.join(",")}&quantity=${productQuantity.join(",")}`,
    cancel_url: `${req.protocol}://${req.get(
      "host"
    )}/app/cart`,
    customer_email: req.user.email,
    // client_reference_id: req.params.productId,
    line_items: lineItems,
  });
  // 3)Create Session as response
  res.status(200).json({
    status: "success",
    id: session.id,
    session,
  });
});

const createBookingsCheckout = asyncHandler(async (req, res, next) => {
  const { product, user, quantity } = req.query;

  if (!user && !product && !quantity) {
    return next();
  }

  const productIds = product
    .split(",")
    .map((productId) => new mongoose.Types.ObjectId(productId));
  const productQuantity = quantity
    .split(",")
    .map((quantity) => parseInt(quantity, 10));

  // console.log(productIds, productQuantity);

  const response = await Booking.create({
    product: productIds,
    user,
    quantity: productQuantity,
  });
  // console.log(response);

  res.redirect(`${req.protocol}://${req.get(
    "host"
  )}/app`);
});

const getMyProducts = asyncHandler(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user._id });
  // console.log(bookings);

  // 2) Extract unique product IDs using Set
  const productIds = bookings.map((el) => el.product);
  // console.log(productIds);

  const flattenedProductIds = [].concat(...productIds);

  // Extract unique product IDs using Set
  const uniqueProductIds = [
    ...new Set(flattenedProductIds.map((product) => product._id.toString())),
  ];
  // console.log(uniqueProductIds);

  const products = await Product.find({ _id: { $in: uniqueProductIds } });
  // console.log(products);

  res.status(200).json({
    title: "My Products",
    products,
  });
});

const createBooking = factoryCreateOne(Booking);
const getBooking = factoryGetOne(Booking);
const getAllBookings = factoryGetAll(Booking);
const updateBooking = factoryUpdateOne(Booking);
const deleteBooking = factoryDeleteOne(Booking);

module.exports = {
  getCheckoutSession,
  createBookingsCheckout,
  getMyProducts,
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
};
