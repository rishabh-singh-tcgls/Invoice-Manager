const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

router.post("/createInvoice", invoiceController.createInvoice);

module.exports = router;
