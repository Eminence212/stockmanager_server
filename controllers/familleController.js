const { Famille } = require("../models");
const familleController = {
  register: async (req, res) => {
    try {
      const { libelle_famille } = req.body;
      if (!libelle_famille)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });
      const famille = await Famille.findOne({ where: { libelle_famille } });
      if (famille)
        return res.status(400).json({
          msg: `La famille : ${famille.libelle_famille} existe déjà.`,
        });

      await Famille.create({ libelle_famille });
      res.json({ msg: "Famille ajoutée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const famille = await Famille.findByPk(req.params.id);
      if (famille) {
        res.json(famille);
      } else {
        return res.status(404).json({ msg: "Non trouvé" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const familles = await Famille.findAll();
      if (familles) {
        res.json(familles);
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
      const { libelle_famille } = req.body;
      const familleById = await Famille.findOne({ where: { id: id } });
      if (!familleById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!libelle_famille)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });

      const famille = await Famille.findOne({ where: { libelle_famille } });
      if (!famille)
        await Famille.update({ libelle_famille }, { where: { id: id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const familleById = await Famille.findOne({ where: { id: id } });
      if (!familleById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant de la famille est vide." });
      await Famille.destroy({ where: { id: id } });
      res.json({ msg: "Supprimée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = familleController;
