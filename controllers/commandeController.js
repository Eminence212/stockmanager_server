const { Commande, Status, Client } = require("../models");
const commandeController = {
  register: async (req, res) => {
    try {
      const { statusId, clientId } = req.body;

      if (statusId === 0 || clientId == 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });

      if (statusId < 0)
        return res.status(400).json({
          msg: `Le status choisie n'existe pas.`,
        });
      if (clientId < 0)
        return res.status(400).json({
          msg: `Le client choisie n'existe pas.`,
        });

      await Commande.create({ date_commande: new Date(), statusId, clientId });
      res.json({ msg: "Commande ajoutée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const commande = await Commande.findByPk(req.params.id, {
        include: [{ model: Status }, { model: Client }],
      });
      if (commande) {
        res.json(commande);
      } else {
        return res.status(404).json({ msg: "Non trouvée" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const commandes = await Commande.findAll({
        include: [{ model: Status }, { model: Client }],
      });
      if (commandes) {
        res.json(commandes);
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
      const { statusId, clientId } = req.body;
      const commande = await Commande.findOne({ where: { id: id } });
      if (statusId === 0 || clientId == 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });

      if (statusId < 0)
        return res.status(400).json({
          msg: `Le status choisie n'existe pas.`,
        });
      if (clientId < 0)
        return res.status(400).json({
          msg: `Le client choisie n'existe pas.`,
        });

      if (commande.statusId !== statusId || commande.clientId !== clientId)
        await Commande.update(
          {
            statusId,
            clientId,
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
      const commandeById = await Commande.findOne({ where: { id: id } });
      if (!commandeById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant de la commande est vide." });
      await Commande.destroy({ where: { id: id } });
      res.json({ msg: "Supprimée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = commandeController;
