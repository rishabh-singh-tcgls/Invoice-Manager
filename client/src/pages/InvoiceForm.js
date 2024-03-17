import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  MenuItem,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  Container,
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { fetchProductMaster, createInvoice } from "../redux/invoiceFormSlice";

const styles = {
  formControl: {
    minWidth: 100,
  },
  borderedContainer: {
    border: "1px solid #ccc",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "16px",
    background: "#f7f7f7",
  },
  containerWrapper: {
    margin: 10,
  },
  primaryButton: {
    background: "#1976d2",
    color: "#fff",
    "&:hover": {
      background: "#1565c0",
    },
  },
  secondaryButton: {
    background: "#9e9e9e",
    color: "#fff",
    "&:hover": {
      background: "#757575",
    },
  },
};

const renderTableHeaders = () => (
  <TableRow>
    <TableCell>Product</TableCell>
    <TableCell>Rate</TableCell>
    <TableCell>Unit</TableCell>
    <TableCell>Qty</TableCell>
    <TableCell>Disc%</TableCell>
    <TableCell>Net Amt.</TableCell>
    <TableCell>Total Amt.</TableCell>
    <TableCell>Action</TableCell>
  </TableRow>
);

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const { productMaster, isLoading } = useSelector((state) => state.formData);

  useEffect(() => {
    dispatch(fetchProductMaster());
  }, [dispatch]);

  const [customerName, setCustomerName] = useState("");
  const [addedProducts, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rate, setRate] = useState("");
  const [qty, setQty] = useState("");
  const [discount, setDiscount] = useState("");
  const [netAmount, setNetAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const handleProductChange = (event) => {
    if (
      selectedProduct !== "" &&
      event.target.value !== selectedProduct.productName
    ) {
      const newSelectedProduct = productMaster.find(
        (product) => product.productName === event.target.value
      );

      const newNetAmount = newSelectedProduct.rate * qty * (1 - discount / 100);
      const newTotalAmount = newNetAmount * qty;
      setSelectedProduct(event.target.value);
      setNetAmount(newNetAmount);
      setTotalAmount(newTotalAmount);
    } else {
      setSelectedProduct(event.target.value);
      const selectedProduct = productMaster.find(
        (product) => product.productName === event.target.value
      );

      if (selectedProduct) {
        setRate(selectedProduct.rate);
        setUnit(selectedProduct.unit);
      }
    }
  };

  const handleQtyChange = (event) => {
    const newQty = event.target.value;
    const newNetAmount = rate * newQty * (1 - discount / 100);
    const newTotalAmount = newNetAmount * newQty;
    setQty(newQty);
    setNetAmount(newNetAmount);
    setTotalAmount(newTotalAmount);
  };

  const handleDiscountChange = (event) => {
    const newDiscount = event.target.value;
    const newNetAmount = rate * qty * (1 - newDiscount / 100);
    const newTotalAmount = newNetAmount * qty;
    setDiscount(newDiscount);
    setNetAmount(newNetAmount);
    setTotalAmount(newTotalAmount);
  };

  const handleAdd = () => {
    const product = productMaster.find(
      (product) => product.productName === selectedProduct
    );

    const newProduct = {
      productId: product._id,
      productName: selectedProduct,
      customerName: customerName,
      qty: qty,
      rate: rate,
      unit: unit,
      discPercentage: discount,
      netAmount: netAmount,
      totalAmount: totalAmount,
    };

    setProducts([...addedProducts, newProduct]);
    resetForm();
  };
  const resetForm = () => {
    setCustomerName("");
    setSelectedProduct("");
    setRate("");
    setQty("");
    setDiscount("");
    setNetAmount("");
    setUnit("");
    setTotalAmount("");
  };

  const handleDelete = (index) => {
    const updatedProducts = [...addedProducts];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleProductChangeInTable = (event, index) => {
    const updatedProducts = [...addedProducts];
    const newSelectedProductName = event.target.value;
    const selectedProduct = productMaster.find(
      (product) => product.productName === newSelectedProductName
    );

    updatedProducts[index].productName = newSelectedProductName;
    updatedProducts[index].rate = selectedProduct.rate;
    updatedProducts[index].unit = selectedProduct.unit;

    const newNetAmount =
      selectedProduct.rate *
      updatedProducts[index].qty *
      (1 - updatedProducts[index].discPercentage / 100);
    const newTotalAmount = newNetAmount * updatedProducts[index].qty;

    updatedProducts[index].netAmount = newNetAmount;
    updatedProducts[index].totalAmount = newTotalAmount;

    setProducts(updatedProducts);
  };

  const handleQtyChangeInTable = (event, index) => {
    const updatedProducts = [...addedProducts];
    const newQty = event.target.value;
    const newNetAmount =
      updatedProducts[index].rate *
      newQty *
      (1 - updatedProducts[index].discPercentage / 100);
    const newTotalAmount = newNetAmount * newQty;
    updatedProducts[index].qty = newQty;
    updatedProducts[index].netAmount = newNetAmount;
    updatedProducts[index].totalAmount = newTotalAmount;
    setProducts(updatedProducts);
  };

  const handleDiscountChangeInTable = (event, index) => {
    const updatedProducts = [...addedProducts];
    const newDiscount = event.target.value;
    const newNetAmount =
      updatedProducts[index].rate *
      updatedProducts[index].qty *
      (1 - newDiscount / 100);
    const newTotalAmount = newNetAmount * updatedProducts[index].qty;
    updatedProducts[index].discPercentage = newDiscount;
    updatedProducts[index].netAmount = newNetAmount;
    updatedProducts[index].totalAmount = newTotalAmount;
    setProducts(updatedProducts);
  };

  const handleSubmit = () => {
    const payload = addedProducts;
    dispatch(createInvoice(payload));
    setProducts([]);
  };

  return (
    <Container style={styles.containerWrapper}>
      <Box sx={styles.borderedContainer}>
        <Typography variant="h6" style={{ marginBottom: "16px" }}>
          Invoice Form
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth style={styles.formControl}>
              <InputLabel>Products</InputLabel>
              <Select
                labelId="product-label"
                value={selectedProduct}
                onChange={handleProductChange}
              >
                {productMaster.map((product) => (
                  <MenuItem key={product._id} value={product.productName}>
                    {product.productName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Qty"
              type="number"
              value={qty}
              onChange={handleQtyChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Discount (%)"
              type="number"
              value={discount}
              onChange={handleDiscountChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Rate: {rate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Unit: {unit}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>Net Amount: {netAmount}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Total Amount: {totalAmount}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              style={styles.primaryButton}
            >
              + Add
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12}>
        <Table sx={{ border: "1px solid #ccc" }}>
          <TableHead>{renderTableHeaders()}</TableHead>
          <TableBody>
            {addedProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>Product</InputLabel>
                    <Select
                      value={product.productName}
                      onChange={(e) => handleProductChangeInTable(e, index)}
                    >
                      {productMaster.map((productOption) => (
                        <MenuItem
                          key={productOption._id}
                          value={productOption.productName}
                        >
                          {productOption.productName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>{product.rate}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={product.qty}
                    onChange={(e) => handleQtyChangeInTable(e, index)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={product.discPercentage}
                    onChange={(e) => handleDiscountChangeInTable(e, index)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>{product.netAmount}</TableCell>
                <TableCell>{product.totalAmount}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(index)}
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Grid item xs={12} style={{ marginTop: "16px", float: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={styles.primaryButton}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InvoiceForm;
