const { Stock_movements, Articles } = require("../models");

const stock_movementCtrl = {
  register: async (req, res) => {
    try {
      const { entryStock, articleId } = req.body;
      if (entryStock === 0 || articleId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });

      if (entryStock < 0)
        return res.status(400).json({
          msg: "Le stock ne peut être vide.",
        });

      const newStock = { entryDate: new Date(), entryStock, articleId };
      await Stock_movements.create(newStock);
      res.json({ msg: "Ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const movement = await Stock_movements.findByPk(id, {
        include: Articles,
      });
      if (!movement) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      res.json(movement);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const movements = await Stock_movements.findAll({
        include: Articles,
      });
      if (!movements) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      res.json(movements);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const movementById = await Stock_movements.findOne({ where: { id: id } });
      if (!movementById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      const { entryStock, articleId } = req.body;
      if (entryStock === 0 || articleId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });

      if (entryStock < 0)
        return res.status(400).json({
          msg: "Le stock ne peut être vide.",
        });

      await Suppliers.update({ entryStock, articleId }, { where: { id: id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      if (id <= 0)
        return res.status(400).json({ msg: "L'identifiant est vide." });
      await Stock_movements.destroy({ where: { id: id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = stock_movementCtrl;
