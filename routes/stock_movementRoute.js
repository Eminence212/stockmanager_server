const router = require("express").Router();
const stock_movementCtrl = require("../controllers/stock_movementCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, stock_movementCtrl.register);
router.get("/:id", auth, stock_movementCtrl.getById);
router.get("/", auth, stock_movementCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, stock_movementCtrl.update);
router.delete("/delete/:id", auth, authAdmin, stock_movementCtrl.delete);

module.exports = router;
