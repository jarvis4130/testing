const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const APIFeatures = require("./../utils/apiFeatures");

const factoryDeleteOne = (Model) =>
  asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

const factoryUpdateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

const factoryCreateOne = (Model) =>
  asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

const factoryGetOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      result: doc.length,
      data: { doc },
    });
  });

const factoryGetAll = (Model) =>
  asyncHandler(async (req, res) => {
    // for nested get review on product
    let filter = {};
    if (req.params.productId) {
      filter = { product: req.params.productId };
    }

    // const keyword = req.query.keyword
    //   ? {
    //       $or: [
    //         { brandName: { $regex: req.query.keyword, $options: "i" } },
    //         { productType: { $regex: req.query.keyword, $options: "i" } },
    //       ],
    //     }
    //   : {};

    const count = await Model.countDocuments();
    const limit = req.query.limit * 1 || 10;

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .keyword()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      status: "success",
      result: doc.length,
      pages: Math.ceil(count / limit), // my page size will always be 16
      data: {
        data: doc,
      },
    });
  });

module.exports = {
  factoryDeleteOne,
  factoryUpdateOne,
  factoryCreateOne,
  factoryGetOne,
  factoryGetAll,
};
