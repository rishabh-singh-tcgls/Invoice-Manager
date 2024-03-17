const { ProductMaster } = require("../models/productMaster");
const { HttpStatusCodes } = require("../utils/httpStatusCode");

const createProductMaster = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ error: "Bad Request - Request body is missing" });
    }

    const newProductMaster = new ProductMaster(req.body);
    await newProductMaster.save();
    res.status(HttpStatusCodes.CREATED).json(newProductMaster);
  } catch (error) {
    console.error("Error while creating article :", error);
  }
};

const getProductMaster = async (req, res) => {
  try {
    const productMasterData = await ProductMaster.find();
    const response = {
      data: productMasterData,
    };
    res.status(HttpStatusCodes.OK).json(response);
  } catch (error) {
    console.error("Error while fetching product master  :", error);
  }
};

module.exports = {
  createProductMaster,
  getProductMaster,
};
