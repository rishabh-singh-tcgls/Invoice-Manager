require("dotenv").config();

const express = require("express");
const connectDB = require("./utils/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const productMasterController = require("./routes/productMasterRoute");
const invoiceController = require("./routes/invoiceRoute");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.use("/api/productMaster", productMasterController);
app.use("/api/invoiceDetail", invoiceController);

const PORT = process.env.PORT;
connectDB(process.env.MONGODB_URL);

app.listen(PORT, () => {
  console.log(`Server is listening on the port  ${PORT}!`);
});
