// backend/server.js

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Medical products database
let medicines = [
  {
    id: 1,
    name: "Paracetamol",
    price: 30,
    stock: 100
  },
  {
    id: 2,
    name: "Vitamin C",
    price: 120,
    stock: 50
  },
  {
    id: 3,
    name: "Cough Syrup",
    price: 95,
    stock: 25
  }
];

// Home route
app.get("/", (req, res) => {
  res.send("Niva Medical Store Backend Running");
});

// Get all medicines
app.get("/api/medicines", (req, res) => {
  res.json(medicines);
});

// Get single medicine
app.get("/api/medicines/:id", (req, res) => {
  const medicine = medicines.find(
    (item) => item.id == req.params.id
  );

  if (!medicine) {
    return res.status(404).json({
      message: "Medicine not found"
    });
  }

  res.json(medicine);
});

// Add medicine
app.post("/api/medicines", (req, res) => {
  const newMedicine = {
    id: medicines.length + 1,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  };

  medicines.push(newMedicine);

  res.status(201).json({
    message: "Medicine added successfully",
    data: newMedicine
  });
});

// Update medicine
app.put("/api/medicines/:id", (req, res) => {
  const medicine = medicines.find(
    (item) => item.id == req.params.id
  );

  if (!medicine) {
    return res.status(404).json({
      message: "Medicine not found"
    });
  }

  medicine.name = req.body.name || medicine.name;
  medicine.price = req.body.price || medicine.price;
  medicine.stock = req.body.stock || medicine.stock;

  res.json({
    message: "Medicine updated",
    data: medicine
  });
});

// Delete medicine
app.delete("/api/medicines/:id", (req, res) => {
  medicines = medicines.filter(
    (item) => item.id != req.params.id
  );

  res.json({
    message: "Medicine deleted"
  });
});

// Order route
app.post("/api/order", (req, res) => {
  const order = req.body;

  res.json({
    message: "Order placed successfully",
    order
  });
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});