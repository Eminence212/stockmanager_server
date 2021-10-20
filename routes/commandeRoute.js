const router = require("express").Router();
const commandeController = require("../controllers/commandeController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, commandeController.register);
router.get("/:id", auth, commandeController.getById);
router.get("/", auth, commandeController.getAll);
router.patch("/update/:id", auth, authAdmin, commandeController.update);
router.delete("/delete/:id", auth, authAdmin, commandeController.delete);

module.exports = router;
