const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

const { mongoose } = require("mongoose");
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected");
});
const PORT = 8000;
app.use(express.json());
app.use("/", require("./routes/authRoutes"));
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
