const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
});

// READ ALL
router.get("/", async (req, res, next) => {
  try {
    const carts = await Cart.find().populate("user products.product");
    res.json(carts);
  } catch (error) {
    next(error);
  }
});

// READ ONE
router.get("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate("user products.product");
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Cart deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;