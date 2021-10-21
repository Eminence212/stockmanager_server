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
app.use("/customer", require("./routes/customerRoute"));
app.use("/family", require("./routes/familyRoute"));
app.use("/supplier", require("./routes/supplierRoute"));
app.use("/settlement", require("./routes/settlementRoute"));
app.use("/currencie", require("./routes/currencieRoute"));
app.use("/status", require("./routes/statusRoute"));
app.use("/unit", require("./routes/unitRoute"));
app.use("/article", require("./routes/articleRoute"));
app.use("/command", require("./routes/commandRoute"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Le server tourne sur le port : ${PORT}`);
});
