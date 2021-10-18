const router = require("express").Router();
const fournisseurController = require("../controllers/fournisseurController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, fournisseurController.register);
router.get("/:id", auth, fournisseurController.getById);
router.get("/", auth, fournisseurController.getAll);
router.patch("/update/:id", auth, authAdmin, fournisseurController.update);
router.delete("/delete/:id", auth, authAdmin, fournisseurController.delete);

module.exports = router;
