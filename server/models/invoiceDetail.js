const mongoose = require("mongoose");

const invoiceDetailSchema = new mongoose.Schema({
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InvoiceMaster",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductMaster",
    required: true,
  },
  rate: { type: Number, required: true },
  unit: { type: String, required: true },
  qty: { type: Number, required: true },
  discPercentage: { type: Number, required: true },
  netAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
});

const InvoiceDetail = mongoose.model("InvoiceDetail", invoiceDetailSchema);

module.exports = {
  InvoiceDetail,
};
