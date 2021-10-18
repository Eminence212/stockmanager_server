const router = require("express").Router();
const familleController = require("../controllers/familleController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, familleController.register);
router.get("/:id", auth, familleController.getById);
router.get("/", auth, familleController.getAll);
router.patch("/update/:id", auth, authAdmin, familleController.update);
router.delete("/delete/:id", auth, authAdmin, familleController.delete);

module.exports = router;
