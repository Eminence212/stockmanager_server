const { Units } = require("../models");
const unitCtrl = {
  register: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });
      const unit = await Units.findOne({ where: { name } });
      if (unit)
        return res.status(400).json({
          msg: `L'unité : ${unit.name} existe déjà.`,
        });

      await Units.create({ name });
      res.json({ msg: "Unité ajoutée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const unit = await Units.findByPk(req.params.id);
      if (unit) {
        res.json(unit);
      } else {
        return res.status(404).json({ msg: "Non trouvée" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const units = await Units.findAll();
      if (units) {
        res.json(units);
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
      const { name } = req.body;
      const unitById = await Units.findOne({ where: { id: id } });
      if (!unitById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!name)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });

      const unit = await Units.findOne({ where: { name } });
      if (!unit) await Units.update({ name }, { where: { id: id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const unitById = await Units.findOne({ where: { id: id } });
      if (!unitById) return res.status(404).json({ msg: "Non trouvée" });
      if (!id) return res.status(400).json({ msg: "L'identifiant est vide." });
      await Units.destroy({ where: { id: id } });
      res.json({ msg: "Supprimée avec succès" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = unitCtrl;
