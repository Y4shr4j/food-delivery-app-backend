// controllers/productController.js
const productModel = require("../../models/productModel");

const getUserProductsController = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user ID in req.user
    const userProducts = await productModel.find({ userId }).sort({ createdAt: -1 });

    res.json({
      message: "User Products",
      success: true,
      error: false,
      data: userProducts,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = {
  getUserProductsController,
};
