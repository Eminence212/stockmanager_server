const router = require("express").Router();
const stockCtrl = require("../controllers/stockCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, stockCtrl.register);
router.get("/:id", auth, stockCtrl.getById);
router.get("/", auth, stockCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, stockCtrl.update);
router.delete("/delete/:id", auth, authAdmin, stockCtrl.delete);

module.exports = router;
