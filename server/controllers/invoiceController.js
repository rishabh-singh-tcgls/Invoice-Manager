const { InvoiceDetail } = require("../models/invoiceDetail");
const { InvoiceMaster } = require("../models/invoiceMaster");
const { HttpStatusCodes } = require("../utils/httpStatusCode");

const createInvoice = async (req, res) => {
  try {
    if (!req.body || req.body.length === 0) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ error: "Bad Request - Request body is missing or empty" });
    }

    const invoices = req.body;

    for (const invoice of invoices) {
      let maxInvoiceNo = 0;
      const maxInvoice = await InvoiceMaster.findOne()
        .sort({ invoiceNo: -1 })
        .limit(1);
      if (maxInvoice) {
        maxInvoiceNo = maxInvoice.invoiceNo;
      }

      let newInvoiceNo = maxInvoiceNo === 0 ? 1 : maxInvoiceNo + 1;

      const newInvoiceMaster = new InvoiceMaster({
        invoiceNo: newInvoiceNo.toString().padStart(3, "0"),
        invoiceDate: new Date(),
        customerName: invoice.customerName,
        totalAmount: invoice.totalAmount,
      });

      await newInvoiceMaster.save();

      const newInvoiceDetail = new InvoiceDetail({
        invoiceId: newInvoiceMaster._id,
        productId: invoice.productId,
        rate: invoice.rate,
        unit: invoice.unit,
        qty: invoice.qty,
        discPercentage: invoice.discPercentage,
        netAmount: invoice.netAmount,
        totalAmount: invoice.totalAmount,
      });
      await newInvoiceDetail.save();
    }

    res
      .status(HttpStatusCodes.CREATED)
      .json({ message: "Invoices created successfully" });
  } catch (error) {
    console.error("Error while creating invoices:", error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createInvoice,
};
