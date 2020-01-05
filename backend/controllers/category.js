const Category = require("../models/category");
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
  const slug = req.params.slug.toLowerCase();
  Category.findOne({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(category);
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
