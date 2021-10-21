const router = require("express").Router();
const distributionCtrl = require("../controllers/distributionCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, distributionCtrl.register);
router.get("/:id", auth, distributionCtrl.getById);
router.get("/", auth, distributionCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, distributionCtrl.update);
router.delete("/delete/:id", auth, authAdmin, distributionCtrl.delete);

module.exports = router;
