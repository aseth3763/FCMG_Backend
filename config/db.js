require("dotenv").config();
const mongoose = require("mongoose");

const mongoUrl = process.env.DB_URL;

mongoose.connect(mongoUrl);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database connected successfully");
});

db.on("disconnected", () => {
  console.log("Database disconnected");
});

db.on("error", (error) => {
  console.log("ERROR :", error);
});

module.exports = db;
