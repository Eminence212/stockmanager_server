const router = require("express").Router();
const modeReglementController = require("../controllers/modeReglementController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, modeReglementController.register);
router.get("/:id", auth, modeReglementController.getById);
router.get("/", auth, modeReglementController.getAll);
router.patch("/update/:id", auth, authAdmin, modeReglementController.update);
router.delete("/delete/:id", auth, authAdmin, modeReglementController.delete);

module.exports = router;
