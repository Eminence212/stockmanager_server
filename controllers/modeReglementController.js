const { Modere_reglement } = require("../models");

const modeReglementController = {
  register: async (req, res) => {
    try {
      const { libelle_reglement } = req.body;
      if (!libelle_reglement)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });
      const reglement = await Modere_reglement.findOne({
        where: { libelle_reglement },
      });
      if (reglement)
        return res.status(400).json({
          msg: `Le mode de reglèment : ${reglement.libelle_reglement} existe déjà.`,
        });

      await Modere_reglement.create({ libelle_reglement });
      res.json({ msg: "Mode reglèment ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const reglement = await Modere_reglement.findByPk(req.params.id);
      if (reglement) {
        res.json(reglement);
      } else {
        return res.status(404).json({ msg: "Non trouvé" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const reglements = await Modere_reglement.findAll();
      if (reglements) {
        res.json(reglements);
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
      const { libelle_reglement } = req.body;
      const reglementById = await Modere_reglement.findOne({
        where: { id: id },
      });
      if (!reglementById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      if (!libelle_reglement)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });

      const reglement = await Modere_reglement.findOne({
        where: { libelle_reglement },
      });
      if (!reglement)
        await Modere_reglement.update(
          { libelle_reglement },
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
      const reglementById = await Modere_reglement.findOne({
        where: { id: id },
      });
      if (!reglementById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant de la famille est vide." });
      await Modere_reglement.destroy({ where: { id: id } });
      res.json({ msg: "Supprimée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = modeReglementController;
