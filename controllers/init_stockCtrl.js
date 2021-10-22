const { Init_stocks, Articles } = require("../models");
const { Op } = require("sequelize");
const init_stockCtrl = {
  register: async (req, res) => {
    try {
      const { quantity, articleId } = req.body;
      const entryDate = new Date();
      if (quantity === 0 || articleId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });

      if (quantity < 0)
        return res.status(400).json({
          msg: "Le stock ne peut être vide.",
        });

      // const initStock = await Init_stocks.findOne({
      //   where: {
      //     entryDate: {
      //       [Op.lt]: new Date(),
      //       [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
      //     },
      //   },
      // });
      // if (initStock)
      //   return res.status(400).json({
      //     msg: "Stock déjà initialisé",
      //   });
      const newStock = {
        entryDate: new Date(),
        quantity,
        articleId,
      };
      await Init_stocks.create(newStock);
      res.json({ msg: "Ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const initStock = await Init_stocks.findByPk(id, {
        include: Articles,
      });
      if (!initStock) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      res.json(initStock);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const initStock = await Init_stocks.findAll({
        include: Articles,
      });
      if (!initStock) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      res.json(initStock);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const initStockById = await Init_stocks.findOne({ where: { id: id } });
      if (!initStockById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      const { quantity, articleId } = req.body;
      if (quantity === 0 || articleId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });

      if (quantity < 0)
        return res.status(400).json({
          msg: "Le stock ne peut être vide.",
        });

      await Init_stocks.update({ quantity, articleId }, { where: { id: id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const stock = await Init_stocks.findOne({ where: { id: id } });
      if (!stock) return res.status(400).json({ msg: "Non trouvé" });
      await Init_stocks.destroy({ where: { id: id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = init_stockCtrl;
