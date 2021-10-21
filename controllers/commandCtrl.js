const { Commands, Status, Customers } = require("../models");
const commandCtrl = {
  register: async (req, res) => {
    try {
      const { statusId, customerId } = req.body;

      if (statusId === 0 || customerId == 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });

      if (statusId < 0)
        return res.status(400).json({
          msg: `Le status choisie n'existe pas.`,
        });
      if (customerId < 0)
        return res.status(400).json({
          msg: `Le client choisie n'existe pas.`,
        });

      await Commands.create({
        dateCommand: new Date(),
        statusId,
        customerId,
      });
      res.json({ msg: "Commande ajoutée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const command = await Commands.findByPk(req.params.id, {
        include: [{ model: Status }, { model: Customers }],
      });
      if (command) {
        res.json(command);
      } else {
        return res.status(404).json({ msg: "Non trouvée" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const commands = await Commands.findAll({
        include: [{ model: Status }, { model: Customers }],
      });
      if (commands) {
        res.json(commands);
      } else {
        return res.status(404).json({ msg: "Non trouvée" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { statusId, customerId } = req.body;
      const command = await Commands.findOne({ where: { id: id } });
      if (statusId === 0 || customerId == 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });

      if (statusId < 0)
        return res.status(400).json({
          msg: `Le status choisie n'existe pas.`,
        });
      if (customerId < 0)
        return res.status(400).json({
          msg: `Le client choisie n'existe pas.`,
        });

      if (command.statusId !== statusId || command.customerId !== customerId)
        await Commands.update(
          {
            statusId,
            customerId,
          },
          { where: { id: id } }
        );
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const commandById = await Commands.findOne({ where: { id: id } });
      if (!commandById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant de la commande est vide." });
      await Commands.destroy({ where: { id: id } });
      res.json({ msg: "Supprimée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = commandCtrl;
