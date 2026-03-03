const validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Name and Price are required"
    });
  }

  next();
};

module.exports = { validateProduct };