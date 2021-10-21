const router = require("express").Router();
const currencieCtrl = require("../controllers/currencieCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, currencieCtrl.register);
router.get("/:id", auth, currencieCtrl.getById);
router.get("/", auth, currencieCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, currencieCtrl.update);
router.delete("/delete/:id", auth, authAdmin, currencieCtrl.delete);

module.exports = router;
