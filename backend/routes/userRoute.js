const express = require("express");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
  addToWishList,
} = require("../controller/userController");
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updateMyPassword,
  restrictTo,
  logOut,
} = require("../controller/authController");

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.use(protect); //protect all routes below

router.post("/:id/wishlist", addToWishList);
router.patch("/updateMyPassword", updateMyPassword);
router.get("/me", getMe, getUser);
router.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);

router.delete("/deleteMe", deleteMe);
router.post("/logout", logOut);

router.route("/:id").get(getUser);
router.use(restrictTo("admin"));

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").patch(updateUser).delete(deleteUser);

module.exports = router;
