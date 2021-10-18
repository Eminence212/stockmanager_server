const { Monnaie } = require("../models");

const monnaieController = {
  register: async (req, res) => {
    try {
      const { libelle_monnaie } = req.body;
      if (!libelle_monnaie)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });
      const monnaie = await Monnaie.findOne({ where: { libelle_monnaie } });
      if (monnaie)
        return res.status(400).json({
          msg: `La monnaie : ${monnaie.libelle_monnaie} existe déjà.`,
        });

      await Monnaie.create({ libelle_monnaie });
      res.json({ msg: "Monnaie ajoutée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const monnaie = await Monnaie.findByPk(req.params.id);
      if (monnaie) {
        res.json(monnaie);
      } else {
        return res.status(404).json({ msg: "Non trouvée" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const monnaies = await Monnaie.findAll();
      if (monnaies) {
        res.json(monnaies);
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
      const { libelle_monnaie } = req.body;
      const monnaieById = await Monnaie.findOne({ where: { id: id } });
      if (!monnaieById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!libelle_monnaie)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });

      const monnaie = await Monnaie.findOne({ where: { libelle_monnaie } });
      if (!monnaie)
        await Monnaie.update({ libelle_monnaie }, { where: { id: id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const monnaieById = await Monnaie.findOne({ where: { id: id } });
      if (!monnaieById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant de la monnaie est vide." });
      await Monnaie.destroy({ where: { id: id } });
      res.json({ msg: "Supprimée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = monnaieController;
