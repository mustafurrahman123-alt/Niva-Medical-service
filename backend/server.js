  // server.js
// Backend server for Niva Medical Store

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/niva_medical_store", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Medicine Schema
const medicineSchema = new mongoose.Schema({
  name: String,
  company: String,
  price: Number,
  stock: Number,
  expiryDate: String,
});

const Medicine = mongoose.model("Medicine", medicineSchema);

// Customer Schema
const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
});

const Customer = mongoose.model("Customer", customerSchema);

// Bill Schema
const billSchema = new mongoose.Schema({
  customerName: String,
  medicines: Array,
  totalAmount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Bill = mongoose.model("Bill", billSchema);

// Home Route
app.get("/", (req, res) => {
  res.send("Niva Medical Store Backend Running");
});

// ================= MEDICINE ROUTES =================

// Add Medicine
app.post("/api/medicines", async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Medicines
app.get("/api/medicines", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Medicine
app.put("/api/medicines/:id", async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Medicine
app.delete("/api/medicines/:id", async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Medicine Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= CUSTOMER ROUTES =================

// Add Customer
app.post("/api/customers", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Customers
app.get("/api/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= BILL ROUTES =================

// Create Bill
app.post("/api/bills", async (req, res) => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Bills
app.get("/api/bills", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Server Port
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
