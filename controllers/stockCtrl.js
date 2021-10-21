const { Stocks, Articles } = require("../models");
const stockCtrl = {
  register: async (req, res) => {
    try {
      const { quantityStock, articleId } = req.body;
      if (quantityStock === 0 || articleId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });

      await Stocks.create({ quantityStock, articleId });
      res.json({ msg: "Ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const stock = await Stocks.findByPk(req.params.id, {
        include: Articles,
      });
      if (stock) {
        res.json(stock);
      } else {
        return res.status(404).json({ msg: "Non trouvé" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const stocks = await Stocks.findAll({ include: Articles });
      if (stocks) {
        res.json(stocks);
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
      const { quantityStock, articleId } = req.body;
      const stockById = await Stocks.findOne({ where: { id: id } });
      if (!stockById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      if (quantityStock === 0 || articleId === 0)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });

      await Families.update(
        { quantityStock, articleId },
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
      const stockById = await Stocks.findOne({ where: { id: id } });
      if (!stockById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      if (id === 0)
        return res.status(400).json({ msg: "L'identifiant est vide." });
      await Families.destroy({ where: { id: id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = stockCtrl;
