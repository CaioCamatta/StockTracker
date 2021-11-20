// Imports
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { env } from "process";
import { Service } from "./models/service";
import { Low, JSONFile } from "lowdb";

// Check if required env vars were passed
if (!env.DATABASE_DIR) {
  throw Error("Must define DATABASE_DIR environment variable.");
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
// app.use(express.static(join(dbDirname, 'public')));

// Set up routes
app.use("/", indexRouter);

export default app;
export { db };
