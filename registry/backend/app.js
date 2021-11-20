// Imports
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

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

module.exports = app;
