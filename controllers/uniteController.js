const { Unite } = require("../models");
const uniteController = {
  register: async (req, res) => {
    try {
      const { libelle_unite } = req.body;
      if (!libelle_unite)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });
      const unite = await Unite.findOne({ where: { libelle_unite } });
      if (unite)
        return res.status(400).json({
          msg: `L'unité : ${unite.libelle_unite} existe déjà.`,
        });

      await Unite.create({ libelle_unite });
      res.json({ msg: "Unité ajoutée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const unite = await Unite.findByPk(req.params.id);
      if (unite) {
        res.json(unite);
      } else {
        return res.status(404).json({ msg: "Non trouvée" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const unites = await Unite.findAll();
      if (unites) {
        res.json(unites);
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
      const { libelle_unite } = req.body;
      const uniteById = await Unite.findOne({ where: { id: id } });
      if (!uniteById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!libelle_unite)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });

      const unite = await Unite.findOne({ where: { libelle_unite } });
      if (!unite) await Unite.update({ libelle_unite }, { where: { id: id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const uniteById = await Unite.findOne({ where: { id: id } });
      if (!uniteById) return res.status(404).json({ msg: "Non trouvée" });
      if (!id) return res.status(400).json({ msg: "L'identifiant est vide." });
      await Unite.destroy({ where: { id: id } });
      res.json({ msg: "Supprimée avec succès" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = uniteController;
