const mongoose = require("mongoose");

const invoiceMasterSchema = new mongoose.Schema({
  invoiceNo: { type: Number, required: true },
  invoiceDate: { type: Date, default: Date.now },
  customerName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
});

const InvoiceMaster = mongoose.model("InvoiceMaster", invoiceMasterSchema);
module.exports = {
  InvoiceMaster,
};
