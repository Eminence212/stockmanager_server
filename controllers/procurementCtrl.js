const {
  sequelize,
  Procurements,
  Articles,
  Suppliers,
  Units,
  Stocks,
} = require("../models");

const procurementCtrl = {
  register: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const {
        initQuantity,
        supplyQuantity,
        purchasePrice,
        articleId,
        supplierId,
        unitId,
      } = req.body;

      if (
        supplyQuantity === 0 ||
        purchasePrice === 0 ||
        articleId === 0 ||
        supplierId === 0 ||
        unitId === 0
      )
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });

      if (supplyQuantity < 0)
        return res.status(400).json({
          msg: `La quantité ne peut être négative.`,
        });
      if (purchasePrice < 0)
        return res.status(400).json({
          msg: `Le prix d'achat ne peut être négatif.`,
        });

      const newProcurement = {
        procurementDate: new Date(),
        initQuantity,
        supplyQuantity,
        purchasePrice,
        articleId,
        supplierId,
        unitId,
      };
      await Procurements.create(newProcurement, { transaction: t });
      await Stocks.update(
        {
          quantityStock: initQuantity + supplyQuantity,
          articleId,
        },
        { where: { articleId: articleId } },
        { transaction: t }
      );

      await t.commit();
      res.json({ msg: "Approvisionnement effectué avec succès !" });
    } catch (error) {
      await t.rollback();
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const procurement = await Procurements.findByPk(req.params.id, {
        include: [{ model: Articles }, { model: Suppliers }],
      });
      if (procurement) {
        res.json(procurement);
      } else {
        return res.status(404).json({ msg: "Non trouvé" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const procurement = await Procurements.findAll({
        include: [{ model: Articles }, { model: Suppliers }, { model: Units }],
      });
      if (procurement) {
        res.json(procurement);
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
      const { purchasePrice, supplierId, unitId } = req.body;
      const procurement = await Procurements.findOne({ where: { id: id } });
      if (!procurement) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      if (purchasePrice === 0 || supplierId === 0 || unitId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });

      if (purchasePrice < 0)
        return res.status(400).json({
          msg: `Le prix d'achat ne peut être négatif.`,
        });

      if (
        procurement.purchasePrice !== purchasePrice ||
        procurement.supplierId !== supplierId ||
        procurement.unitId !== unitId
      )
        await Procurements.update(
          {
            purchasePrice,
            supplierId,
            unitId,
          },
          { where: { id: id } }
        );
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const { quantity, articleId } = req.body;

      const procurementById = await Procurements.findOne({ where: { id: id } });
      if (!procurementById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      await Procurements.destroy({ where: { id: id }, transaction: t });
      const stock = await Stocks.findOne({
        where: { articleId: articleId },
        transaction: t,
      });

      await Stocks.update(
        {
          quantityStock: stock.quantityStock - quantity,
          articleId,
        },
        { where: { articleId: articleId }, transaction: t }
      );
      await t.commit();
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      await t.rollback();
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = procurementCtrl;
