const router = require("express").Router();
const init_stockCtrl = require("../controllers/init_stockCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, init_stockCtrl.register);
router.get("/:id", auth, init_stockCtrl.getById);
router.get("/", auth, init_stockCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, init_stockCtrl.update);
router.delete("/delete/:id", auth, authAdmin, init_stockCtrl.delete);

module.exports = router;
