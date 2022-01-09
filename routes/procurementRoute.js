const router = require("express").Router();
const procurementCtrl = require("../controllers/procurementCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/filter", auth, procurementCtrl.getFilter);
router.post("/add", auth, procurementCtrl.register);
router.get("/:id", auth, procurementCtrl.getById);
router.get("/", auth, procurementCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, procurementCtrl.update);
router.delete("/delete/:id", auth, authAdmin, procurementCtrl.delete);

module.exports = router;
