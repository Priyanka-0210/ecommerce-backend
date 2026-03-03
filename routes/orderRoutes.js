const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// READ ALL
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// READ ONE
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("products.product");
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;