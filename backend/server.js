const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const path = require("path");
const compression = require("compression");
const cors = require("cors");

const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const reviewRouter = require("./routes/reviewRoute");
const bookingRouter = require("./routes/bookingRoute");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controller/errorController");

connectDB();

// set security http headers
app.use(helmet());

// Set Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      frameSrc: ["'self'", "https://js.stripe.com"],
      // Add other directives as needed
    },
  })
);

app.set("trust proxy", 1); // or app.set('trust proxy', 2);

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());

// Rate limit
const limiter = rateLimit({
  // max: 100,
  max: 1000000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this Ip, Please try again later",
  // 100 req from same ip in 1 hour
});

app.use("/api", limiter);

// Body parse, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Cookie Parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize()); // email gt than

// Data sanitization against XSS
app.use(xss()); //html code

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "sizes",
      "ratingsQuantity",
      "ratingsAverage",
      "mrp",
      "price",
      "priceAfterDiscount",
      "discountPercentage",
    ],
  })
);
// text compression
app.use(compression());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/bookings", bookingRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.all("*", (req, res, next) => {
  // const err=new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status='fail'
  // err.statusCode=400;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server started on port 5000`);
});
