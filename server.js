const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
const studyRoutes = require('./routes/studyRoutes');
app.use('/api/study', studyRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Student Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Student = mongoose.model("Student", studentSchema);

// Home Route
app.get("/", (req, res) => {
    res.send("AI Study Buddy API is running!");
});

// CREATE - Add Student
app.post("/students", async (req, res) => {
    try {
        const student = new Student({
            name: req.body.name,
            email: req.body.email
        });

        const savedStudent = await student.save();

        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ - Get All Students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ - Get One Student
app.get("/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE - Update Student
app.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email
            },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Delete Student
app.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});