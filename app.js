const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Patient Schema
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  disease: String,
  doctor: String
});

// Patient Model
const Patient = mongoose.model("Patient", patientSchema);

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Add Patient
app.post("/add-patient", async (req, res) => {

  try {

    const patient = new Patient({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      disease: req.body.disease,
      doctor: req.body.doctor
    });

    await patient.save();

    res.json({
      message: "Patient added successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error adding patient"
    });

  }

});

// Get All Patients
app.get("/patients", async (req, res) => {

  try {

    const patients = await Patient.find();

    res.json(patients);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching patients"
    });

  }

});

// Delete Patient
app.delete("/delete-patient/:id", async (req, res) => {

  try {

    await Patient.findByIdAndDelete(req.params.id);

    res.json({
      message: "Patient deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting patient"
    });

  }

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});