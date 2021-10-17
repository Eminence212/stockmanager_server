const { User } = require("../models");

const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user.role !== 1)
      return res.status(500).json({ msg: "Accès interdit aux ressources." });
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = authAdmin;
