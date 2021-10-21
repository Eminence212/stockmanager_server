const router = require("express").Router();
const settlementCtrl = require("../controllers/settlementCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, settlementCtrl.register);
router.get("/:id", auth, settlementCtrl.getById);
router.get("/", auth, settlementCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, settlementCtrl.update);
router.delete("/delete/:id", auth, authAdmin, settlementCtrl.delete);

module.exports = router;
