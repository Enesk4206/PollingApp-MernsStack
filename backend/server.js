require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const pollRoutes = require("./routes/pollRoutes.js");

const app = express();

//middleware to CORS
app.use( 
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

app.use(express.json());


connectDB()

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/poll", pollRoutes)

app.use("/uploads",express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`)
});


