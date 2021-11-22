// Imports
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { env } from "process";
import { Service } from "./models/service";
import { Low, JSONFile } from "lowdb";

// Check if required env vars were passed
if (!env.DATABASE_DIR || !env.API_KEY) {
  throw Error(
    "Must define the following environment variables: API_KEY, DATABASE_DIR."
  );
}

// Define data model
type Data = Service[];

// Use JSON file for storage
const dbDirname = env.DATABASE_DIR;
const file = dbDirname + "db.json";
const adapter = new JSONFile<Data>(file);
var db = new Low<Data>(adapter);

// Read data from JSON file, this will set db.data content
(async () => {
  await db.read();
  // If file.json doesn't exist, db.data will be null, so set default data
  db.data ||= [];
})();

// Import routes
import indexRouter from "./routes/index";

// App instance
var app = express();

// Configure middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Protect all non-GET Routes
app.use((req, res, next) => {
  const apiKey = req.get("API-Key");
  if (req.method !== "GET" && (!apiKey || apiKey !== process.env.API_KEY)) {
    res
      .status(401)
      .send("Unauthorized. Please include valid API-Key in request.");
  } else {
    next();
  }
});

// Set up routes
app.use("/", indexRouter);

export default app;
export { db };
