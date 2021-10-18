const router = require("express").Router();
const statusController = require("../controllers/statusController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, statusController.register);
router.get("/:id", auth, statusController.getById);
router.get("/", auth, statusController.getAll);
router.patch("/update/:id", auth, authAdmin, statusController.update);
router.delete("/delete/:id", auth, authAdmin, statusController.delete);

module.exports = router;
