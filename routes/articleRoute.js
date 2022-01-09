const router = require("express").Router();
const articleCtrl = require("../controllers/articleCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, articleCtrl.register);
router.get("/:id", auth, articleCtrl.getById);
router.get("/", articleCtrl.getAll);
router.patch("/update/:id", auth, authAdmin, articleCtrl.update);
router.delete("/delete/:id", auth, authAdmin, articleCtrl.delete);

module.exports = router;
