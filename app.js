const express = require("express");
const app = express();

app.use(express.json());

let patients = [];

// Home route
app.get("/", (req, res) => {
  res.send("Healthcare App Running");
});

// Add patient
app.post("/add-patient", (req, res) => {
  const patient = req.body;
  patients.push(patient);
  res.send("Patient added successfully");
});

// View patients
app.get("/patients", (req, res) => {
  res.json(patients);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});