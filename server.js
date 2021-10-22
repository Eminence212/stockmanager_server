require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/user", require("./routes/userRoute")); //Utilisateur
app.use("/customer", require("./routes/customerRoute")); //client
app.use("/family", require("./routes/familyRoute")); //Famille
app.use("/supplier", require("./routes/supplierRoute")); //Fournisseur
app.use("/settlement", require("./routes/settlementRoute")); //Mode règlement
app.use("/currencie", require("./routes/currencieRoute")); //Monnaie
app.use("/status", require("./routes/statusRoute")); //status de la commande
app.use("/unit", require("./routes/unitRoute")); // Unité de stockage
app.use("/article", require("./routes/articleRoute")); //Article
app.use("/command", require("./routes/commandRoute")); //Commande
app.use("/rate", require("./routes/rateRoute")); //Taux
app.use("/procurement", require("./routes/procurementRoute")); //Approvisionnement ou Entrée
app.use("/distribution", require("./routes/distributionRoute")); //Distribution ou Sortie
app.use("/invoice", require("./routes/invoiceRoute")); //Facture
app.use("/stock_movement", require("./routes/stock_movementRoute")); //Mouvement stock
app.use("/stock", require("./routes/stockRoute")); //Stock
app.use("/init_stock", require("./routes/invoiceRoute")); //Stock initial

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`The server run on por: ${PORT}`);
});
