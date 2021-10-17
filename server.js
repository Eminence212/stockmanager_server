require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/user", require("./routes/userRoute"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Le server tourne sur le port : ${PORT}`);
});
