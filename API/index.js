const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const signupRoute = require("./routes/signupRoute");
app.use("/", signupRoute);

// Custom Middleware
app.use(errorHandler);

app.listen(process.env.PORT);
