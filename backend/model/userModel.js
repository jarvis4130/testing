const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name."],
    },
    email: {
      type: String,
      required: [true, "Please provide your email."],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide your email."],
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller", "manager"],
      default: "user",
    },
    wishlist: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    password: {
      type: String,
      minLength: 8,
      required: [true, "Please provide a password."],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide a password Confirm."],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password are not the same.",
      },
    },
    photo: {
      type: String,
      default: "placeholder.jpg",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

// Hashing Password , work only between create and save.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000 * 60;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // if changed time stamp is greater than password is changed
    return JWTTimeStamp < changedTimeStamp;
  }

  return false;
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // console.log(resetToken, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 60 * 1000 * 10;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
