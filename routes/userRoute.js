const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/register", userCtrl.register);
router.post("/activation", userCtrl.activateAccount);
router.post("/login", userCtrl.login);
router.post("/refresh_token", userCtrl.getAccessToken);
router.post("/forgot", userCtrl.forgotPassword);
router.post("/reset", userCtrl.resetPassword);
router.get("/infor", auth, userCtrl.getUserInfor);
router.get("/all_infor", auth, authAdmin, userCtrl.getUsersAllInfor);
router.get("/logout", userCtrl.logout);
router.patch("/update_avatar", auth, userCtrl.updateAvatar);
router.patch("/update_role/:id", auth, authAdmin, userCtrl.updateUsersRole);
router.delete("/delete/:id", auth, authAdmin, userCtrl.deleteUser);

module.exports = router;
