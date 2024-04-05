const AppError = require("../utils/AppError");
const User = require("./../model/userModel");
const asyncHandler = require("express-async-handler");
const {
  factoryDeleteOne,
  factoryUpdateOne,
  factoryGetOne,
  factoryGetAll,
} = require("./handleFactory");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../../frontend/public/img/user");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const uploadUserPhoto = upload.single("photo");

const resizeUserPhoto = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
  const outputPath = path.resolve(
    __dirname,
    "../../frontend/public/img/user/",
    req.file.filename
  );

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  next();
});

const getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

const updateMe = asyncHandler(async (req, res, next) => {
  // console.log(req.file);
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This Route is not for Updating Password. Please use /updateMyPassword",
        400
      )
    );
  }
  //Updating Document
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  // console.log(updatedUser);
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

const deleteMe = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(201).json({
    status: "success",
    data: null,
  });
});

// @desc    Get all user
// @route   Get /api/users
// @access  Private
const getAllUsers = factoryGetAll(User);
const getUser = factoryGetOne(User);

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined. Please use /signup instead.",
  });
};

const addToWishList = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log("Id", id);
  const { productId } = req.body;
  // console.log("ProductId", productId);

  const user = await User.findById(id);
  // console.log(user);

  if (!user) {
    return next(new AppError("No user exists with that ID."));
  }
  // Check if the product is already in the wishlist
  const isProductInWishlist = user.wishlist.some((item) => {
    return item.product.equals(productId);
  });

  // console.log(isProductInWishlist);

  if (isProductInWishlist) {
    // If the product is already in the wishlist, remove it
    user.wishlist = user.wishlist.filter(
      (item) => !item.product.equals(productId)
    );
  } else {
    // If the product is not in the wishlist, add it
    user.wishlist.push({ product: productId });
  }

  // Save the updated user with the modified wishlist
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
  });
});

// const addToWishList = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const { productId } = req.body;

//   console.log(productId);

//   const user = await User.findById(id);
//   // console.log(user);
//   if (user) {
//     const wishlistArray = user.wishlist || [];
//     console.log(wishlistArray);

//     // Check if the product is already in the wishlist
//     const isProductInWishlist = wishlistArray.some((item) => {
//       console.log(item._id.toString(), productId.toString());
//       return item._id.equals(productId);
//     });

//     console.log(isProductInWishlist);

//     if (isProductInWishlist) {
//       // If the product is already in the wishlist, remove it
//       user.wishlist = wishlistArray.filter((item) =>
//         item._id.equals(productId)
//       );
//     } else {
//       // If the product is not in the wishlist, add it
//       user.wishlist.push({ productId });
//       await user.save({ validateBeforeSave: false });
//     }

//     console.log();
//     res.status(200).send("Product added/removed from wishlist successfully.");
//   }
//   // if (user) {
//   //   // Check if the product is already in the wishlist
//   //   const isProductInWishlist = user.wishlist.some((item) =>
//   //     item.product.equals(productId)
//   //   );
//   //   console.log(isProductInWishlist);

//   //   if (isProductInWishlist) {
//   //     // If the product is already in the wishlist, remove it
//   //     user.wishlist = user.wishlist.filter(
//   //       (item) => !item._id.equals(productId)
//   //     );
//   //   } else {
//   //     // If the product is not in the wishlist, add it
//   //     user.wishlist.push({ productId });
//   //     await user.save({ validateBeforeSave: false });
//   //   }
//   //   console.log();
//   //   res.status(200).send("Product added/removed from wishlist successfully.");
//   // }
//   else {
//     res.status(404).send("User not found.");
//   }
// });

// admin
const updateUser = factoryUpdateOne(User);
// admin
const deleteUser = factoryDeleteOne(User);

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
  addToWishList,
};
