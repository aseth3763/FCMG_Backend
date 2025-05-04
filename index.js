const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("./config/db");
const { swaggerUi, specs } = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const userAuthRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

app.get("/", (req, res) => {
  res.send("Welcome to homepage")
  console.log("Welcome to homepage");
});

app.use("/api", userAuthRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port: ${process.env.PORT || 5000}`);
});
