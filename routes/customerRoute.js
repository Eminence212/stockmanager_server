const router = require("express").Router();
const customerCtrl = require("../controllers/customerCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, customerCtrl.register);
router.get("/:id", auth, customerCtrl.getById);
router.get("/", auth, customerCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, customerCtrl.update);
router.delete("/delete/:id", auth, authAdmin, customerCtrl.delete);

module.exports = router;
