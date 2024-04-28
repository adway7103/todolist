const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const { mongoose } = require("mongoose");
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected");
});

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/todo"));
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
