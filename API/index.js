const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const mongoDBConnection = require("./config/mongoConnection");

mongoDBConnection();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const signupRoute = require("./routes/signupRoute");
const userRoute = require("./routes/userRoute");
app.use("/", signupRoute);
app.use("/", userRoute);

// Custom Middleware
app.use(errorHandler);

app.listen(process.env.PORT);
