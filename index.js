const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = 5001;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Welcome to homepage");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listenting on port : ${process.env.PORT}`);
});


