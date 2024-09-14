const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (categoryList == 0) {
    return res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid Category ID format." });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ message: "The category with the given ID was not found." });
    }

    return res.status(200).send(category);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) {
    return res.status(404).send("the category cannot be created!");
  }
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) {
    return res.status(404).send("the category cannot be updated!");
  }
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (category) {
    return res
      .status(200)
      .json({ success: true, message: "the category is deleted!" });
  } else {
    return res
      .status(404)
      .json({ success: false, message: "category not found!" });
  }
});

module.exports = router;
