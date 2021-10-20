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
app.use("/client", require("./routes/clientRoute"));
app.use("/famille", require("./routes/familleRoute"));
app.use("/fournisseur", require("./routes/fournisseurRoute"));
app.use("/mode_reglement", require("./routes/modeReglementRoute"));
app.use("/monnaie", require("./routes/monnaieRoute"));
app.use("/status", require("./routes/statusRoute"));
app.use("/unite", require("./routes/uniteRoute"));
app.use("/article", require("./routes/articleRoute"));
app.use("/commande", require("./routes/commandeRoute"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Le server tourne sur le port : ${PORT}`);
});
