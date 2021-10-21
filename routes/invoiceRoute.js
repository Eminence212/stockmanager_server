const router = require("express").Router();
const invoiceCtrl = require("../controllers/invoiceCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, invoiceCtrl.register);
router.get("/:id", auth, invoiceCtrl.getById);
router.get("/", auth, invoiceCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, invoiceCtrl.update);
router.delete("/delete/:id", auth, authAdmin, invoiceCtrl.delete);

module.exports = router;
