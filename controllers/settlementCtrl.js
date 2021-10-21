const { Settlements, Invoices } = require("../models");

const settlementCtrl = {
  register: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });
      const settlement = await Settlements.findOne({
        where: { name },
      });
      if (settlement)
        return res.status(400).json({
          msg: `Le mode de reglèment : ${settlement.name} existe déjà.`,
        });

      await Settlements.create({ name });
      res.json({ msg: "Mode reglèment ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const settlement = await Settlements.findByPk(req.params.id, {
        include: Invoices,
      });
      if (settlement) {
        res.json(settlement);
      } else {
        return res.status(404).json({ msg: "Non trouvé" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const settleents = await Settlements.findAll({ include: Invoices });
      if (settleents) {
        res.json(settleents);
      } else {
        return res.status(404).json({ msg: "Non trouvé" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const settlementById = await Settlements.findOne({
        where: { id: id },
      });
      if (!settlementById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      if (!name)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });

      const settlement = await Settlements.findOne({
        where: { name },
      });
      if (!settlement)
        await Settlements.update({ name }, { where: { id: id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const settlementById = await Settlements.findOne({
        where: { id: id },
      });
      if (!settlementById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant de la famille est vide." });
      await Settlements.destroy({ where: { id: id } });
      res.json({ msg: "Supprimée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = settlementCtrl;
