const router = require("express").Router();
const familieCtrl = require("../controllers/familieCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, familieCtrl.register);
router.get("/:id", auth, familieCtrl.getById);
router.get("/", auth, familieCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, familieCtrl.update);
router.delete("/delete/:id", auth, authAdmin, familieCtrl.delete);

module.exports = router;
