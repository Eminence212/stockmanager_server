const router = require("express").Router();
const articleController = require("../controllers/articleController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/add", auth, articleController.register);
router.get("/:id", auth, articleController.getById);
router.get("/", auth, articleController.getAll);
router.patch("/update/:id", auth, authAdmin, articleController.update);
router.delete("/delete/:id", auth, authAdmin, articleController.delete);

module.exports = router;
