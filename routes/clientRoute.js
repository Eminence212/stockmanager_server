const router = require("express").Router();
const clientController = require("../controllers/clientController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, clientController.register);
router.get("/:id", auth, clientController.getById);
router.get("/", auth, clientController.getAll);
router.patch("/update/:id", auth, authAdmin, clientController.update);
router.delete("/delete/:id", auth, authAdmin, clientController.delete);

module.exports = router;
