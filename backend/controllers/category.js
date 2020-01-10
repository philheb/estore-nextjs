const Category = require("../models/category");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const slugify = require("slugify");

exports.create = (req, res) => {
  Category.findOne({ name: req.body.name }).exec((err, cat) => {
    if (cat) {
      return res.status(400).json({
        error: "This category already exist"
      });
    }

    const { name } = req.body;
    const slug = slugify(name).toLowerCase();

    const category = new Category({ name, slug });
    category.save((err, data) => {
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
  console.log(req);
  const slug = req.params.slug.toLowerCase();
  let limit = req.body.limit ? parseInt(req.body.limit) : 6;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let gte = req.body.gte ? parseInt(req.body.gte) : 0;
  let lte = req.body.lte ? parseInt(req.body.lte) : 9999999999;
  let search = req.body.search ? req.body.search : "";
  console.log(search);
  let products;

  Category.findOne({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    Product.find({
      category,
      price: { $gte: gte, $lte: lte },
      $or: [{ title: { $regex: search, $options: "i" } }]
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec((err, data) => {
        if (err) {
          return res.json({
            error: errorHandler(err)
          });
        }
        products = data;

        res.json({ category, products, size: products.length });
      });
  });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Category.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: "Category deleted successfully"
    });
  });
};

exports.list = (req, res) => {
  Category.find({})
    .sort({ slug: 1 })
    .exec((err, categories) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(categories);
    });
};
