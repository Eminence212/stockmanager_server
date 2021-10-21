const router = require("express").Router();
const rateCtrl = require("../controllers/rateCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, rateCtrl.register);
router.get("/:id", auth, rateCtrl.getById);
router.get("/", auth, rateCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, rateCtrl.update);
router.delete("/delete/:id", auth, authAdmin, rateCtrl.delete);

module.exports = router;
