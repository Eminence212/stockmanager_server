const router = require("express").Router();
const supplierCtrl = require("../controllers/supplierCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, supplierCtrl.register);
router.get("/:id", auth, supplierCtrl.getById);
router.get("/", auth, supplierCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, supplierCtrl.update);
router.delete("/delete/:id", auth, authAdmin, supplierCtrl.delete);

module.exports = router;
