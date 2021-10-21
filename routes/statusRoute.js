const router = require("express").Router();
const statusCtrl = require("../controllers/statusCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, statusCtrl.register);
router.get("/:id", auth, statusCtrl.getById);
router.get("/", auth, statusCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, statusCtrl.update);
router.delete("/delete/:id", auth, authAdmin, statusCtrl.delete);

module.exports = router;
