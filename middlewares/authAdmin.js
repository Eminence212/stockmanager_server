const { Users } = require("../models");

const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { id: req.user.id } });
    if (user.role !== 1)
      return res.status(500).json({ msg: "Accès interdit aux ressources." });
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = authAdmin;
