const { Status } = require("../models");
const statusController = {
  register: async (req, res) => {
    try {
      const { libelle_status } = req.body;
      if (!libelle_status)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });
      const statuss = await Status.findOne({ where: { libelle_status } });
      if (statuss)
        return res.status(400).json({
          msg: `Le status : ${statuss.libelle_status} existe déjà.`,
        });

      await Status.create({ libelle_status });
      res.json({ msg: "Status ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const statuss = await Status.findByPk(req.params.id);
      if (statuss) {
        res.json(statuss);
      } else {
        return res.status(404).json({ msg: "Non trouvé" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const statuss = await Status.findAll();
      if (statuss) {
        res.json(statuss);
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
      const { libelle_status } = req.body;
      const statusById = await Status.findOne({ where: { id: id } });
      if (!statusById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      if (!libelle_status)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });

      const statuss = await Status.findOne({ where: { libelle_status } });
      if (!statuss)
        await Status.update({ libelle_status }, { where: { id: id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const stausById = await Status.findOne({ where: { id: id } });
      if (!stausById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant du status est vide." });
      await Status.destroy({ where: { id: id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = statusController;
