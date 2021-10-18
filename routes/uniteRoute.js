const router = require("express").Router();
const uniteController = require("../controllers/uniteController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, uniteController.register);
router.get("/:id", auth, uniteController.getById);
router.get("/", auth, uniteController.getAll);
router.patch("/update/:id", auth, authAdmin, uniteController.update);
router.delete("/delete/:id", auth, authAdmin, uniteController.delete);

module.exports = router;
