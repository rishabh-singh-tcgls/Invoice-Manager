const express = require("express");
const router = express.Router();
const productMasterController = require("../controllers/productMasterController");

router.post(
  "/createProductMaster",
  productMasterController.createProductMaster
);
router.get(`/fetchProductMaster`, productMasterController.getProductMaster);

module.exports = router;
