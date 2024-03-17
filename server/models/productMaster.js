const mongoose = require("mongoose");

const productMasterSchema = new mongoose.Schema({
  productName: { type: String, required: true, index: true },
  rate: { type: Number, required: true },
  unit: { type: String, required: true },
});

const ProductMaster = mongoose.model("ProductMaster", productMasterSchema);

module.exports = {
  ProductMaster,
};
