const router = require("express").Router();
const monnaieController = require("../controllers/monnaieController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, monnaieController.register);
router.get("/:id", auth, monnaieController.getById);
router.get("/", auth, monnaieController.getAll);
router.patch("/update/:id", auth, authAdmin, monnaieController.update);
router.delete("/delete/:id", auth, authAdmin, monnaieController.delete);

module.exports = router;
