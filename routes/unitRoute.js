const router = require("express").Router();
const unitCtrl = require("../controllers/unitCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, unitCtrl.register);
router.get("/:id", auth, unitCtrl.getById);
router.get("/", auth, unitCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, unitCtrl.update);
router.delete("/delete/:id", auth, authAdmin, unitCtrl.delete);

module.exports = router;
