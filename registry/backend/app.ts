// Imports
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
// var path = require("path");

// Import routes
var indexRouter = require("./routes/index");

// App instance
var app = express();

// Configure middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use("/", indexRouter);

export default app;
