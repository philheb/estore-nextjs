const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const slugify = require("slugify");

exports.create = (req, res) => {
  console.log(req.user._id);
  Product.findOne({ title: req.body.title }).exec((err, cat) => {
    if (cat) {
      return res.status(400).json({
        error: "This product already exist"
      });
    }

    const {
      title,
      description,
      price,
      category,
      quantity,
      imageUrl,
      shipping
    } = req.body;
    const slug = slugify(title).toLowerCase();

    const product = new Product({
      title,
      description,
      price,
      category,
      quantity,
      imageUrl,
      shipping,
      slug,
      createdBy: req.user._id
    });
    product.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(data);
    });
  });
};

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Product.findOne({ slug })
    .populate("category")
    .exec((err, data) => {
      if (err) {
        return res.json({
          err: errorHandler(err)
        });
      }
      res.json(data);
    });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Product.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.json({
        err: errorHandler(err)
      });
    }
    res.json({
      message: "Product deleted successfully"
    });
  });
};

exports.update = (req, res) => {
  const oldSlug = req.params.slug.toLowerCase();

  const {
    title,
    description,
    price,
    category,
    quantity,
    imageUrl,
    shipping
  } = req.body;
  const newSlug = slugify(title).toLowerCase();

  const updatedProduct = {
    title,
    description,
    price,
    category,
    quantity,
    imageUrl,
    shipping,
    slug: newSlug
  };

  Product.findOneAndUpdate(
    { slug: oldSlug },
    { $set: updatedProduct },
    { new: true }
  ).then(product => res.json(product));
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  let gte = req.query.gte ? parseInt(req.query.gte) : 0;
  let lte = req.query.lte ? parseInt(req.query.lte) : 9999999999;
  let slug = req.query.category ? req.query.category : "";

  console.log(req.query.gte, req.query.lte);

  Product.find({ price: { $gte: gte, $lte: lte } })
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return req.json({
          error: err
        });
      }
      res.json(products);
    });
};

exports.listRelated = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 3;
  let { _id, category } = req.body;

  Product.find({ _id: { $ne: _id }, category: { $in: category } })
    .sort([["createdAt", "desc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return req.json({
          err: errorHandler(err)
        });
      }
      res.json(products);
    });
};

exports.listCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return req.json({
        err: errorHandler(err)
      });
    }
    res.json(categories);
  });
};

exports.listSearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found"
        });
      }
      res.json({
        size: data.length,
        data
      });
    });
};

exports.listSearch = (req, res) => {
  const query = {};
  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: "i" };
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }

    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(products);
    }).select("-photo");
  }
};

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map(product => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { quantity: -product.count, sold: +product.count } }
      }
    };
  });
  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: "Could not update the product's quantities"
      });
    }
    next();
  });
};
