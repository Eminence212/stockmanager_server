const { Families, Articles } = require("../models");
const familieCtrl = {
  register: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });
      const family = await Families.findOne({
        where: { name },
      });
      if (family)
        return res.status(400).json({
          msg: `La famille : ${family.name} existe déjà.`,
        });

      await Families.create({ name });
      res.json({ msg: "Famille ajoutée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const family = await Families.findByPk(req.params.id, {
        include: Articles,
      });
      if (family) {
        res.json(family);
      } else {
        return res.status(404).json({ msg: "Non trouvée" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const families = await Families.findAll({ include: Articles });
      if (families) {
        res.json(families);
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
      const familyById = await Families.findOne({ where: { id: id } });
      if (!familyById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!name)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });

      const family = await Families.findOne({ where: { name } });
      if (!family)
        await Families.update({ name }, { where: { id: id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const familyById = await Families.findOne({ where: { id: id } });
      if (!familyById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant de la famille est vide." });
      await Families.destroy({ where: { id: id } });
      res.json({ msg: "Supprimée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = familieCtrl;
