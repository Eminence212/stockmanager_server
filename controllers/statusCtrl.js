const { Status, Commands } = require("../models");
const statusController = {
  register: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });
      const status = await Status.findOne({ where: { name } });
      if (status)
        return res.status(400).json({
          msg: `Le status : ${status.name} existe déjà.`,
        });
      await Status.create({ name });
      res.json({ msg: "Status ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const statuss = await Status.findByPk(req.params.id, {
        include: Commands,
      });
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
      const statuss = await Status.findAll({ include: Commands });
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
      const { name } = req.body;
      const statusById = await Status.findOne({ where: { id: id } });
      if (!statusById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      if (!name)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });

      const status = await Status.findOne({ where: { name } });
      if (!status)
        await Status.update({ name }, { where: { id: id } });
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
