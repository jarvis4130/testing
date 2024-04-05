const User = require("../model/userModel");
const { promisify } = require("util");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const Email = require("../utils/email");
const crypto = require("crypto");

const createSendToken = (user, statusCode, req, res) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true,// protect Attackers Allow it when deploying
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    httpOnly: true,
  };

  // name of the cookie, data wanna send in cookie
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  user.passwordConfirm = undefined;

  res.status(statusCode).json({
    status: "success",
    // token,
    data: {
      user,
    },
  });
};

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const signUp = asyncHandler(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // if (process.env.NODE_ENV === "production") {
  const url = `https://a2zclothing.onrender.com/app/profile`;
  // } else {
  //   const url = `http://localhost:5173/app/profile`;
  // }

  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, req, res);
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid credentials", 401));
  }

  createSendToken(user, 200, req, res);
});

const logOut = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Logout Successfully",
  });
});

// @desc    Token authorization middleware
// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   // get token
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   // check token
//   if (!token) {
//     return next(new AppError("You are not LoggedIn. Please Login", 401));
//   }
//   // verify token and check if user still exists
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError("The user belonging to the user no longer exist.", 401)
//     );
//   }

//   // check if user change password
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError("User recently changed Password!. Please login again", 401)
//     );
//   }
//   req.user = currentUser;

//   next();
// });

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // get token
  token = req.cookies.jwt;

  // check token
  if (!token) {
    return next(new AppError("You are not LoggedIn. Please Login", 401));
  }
  // verify token and check if user still exists
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to the user no longer exist.", 401)
    );
  }

  // check if user change password
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed Password!. Please login again", 401)
    );
  }
  req.user = currentUser;

  next();
});

// @desc    Admin authorization middleware
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
// @desc generate token function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc    Forgot Password user
// @route   POST /api/users/forgotPassword
// access Public
const forgotPassword = asyncHandler(async (req, res, next) => {
  //1) Check if user exist in database
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }
  //2) create resetToken
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  try {
    // 3)sending to user email
    // const resetURL = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/users/resetPassword/${resetToken}`;
    // if (process.env.NODE_ENV === "production") {
    const resetURL = `https://a2zclothing.onrender.com/users/resetPassword/${resetToken}`;
    // } else {
    //   const resetURL = `${req.protocol}://localhost:5173/users/resetPassword/${resetToken}`;
    // }
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "TOken sent",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending in an email. Please try again later",
        500
      )
    );
  }
});

// @desc    Reset password user
// @route   PATCH /api/users/resetPassword/token
// access Public
const resetPassword = asyncHandler(async (req, res, next) => {
  // 1)Get user from token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2)if token not expired , and user there , change password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3)update change password
  // 4)log user in , send JWT

  createSendToken(user, 200, req, res);
});

// @desc    UpdatePassword
const updateMyPassword = asyncHandler(async (req, res, next) => {
  // 1)get user
  const user = await User.findById(req.user._id).select("+password");

  // 2)check if posted password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }

  // 3)if so update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4)login user , JWT
  createSendToken(user, 200, req, res);
});

module.exports = {
  signUp,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updateMyPassword,
  logOut,
};
