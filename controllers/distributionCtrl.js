const { Distributions, Articles, Commands } = require("../models");
const distributionCtrl = {
  register: async (req, res) => {
    try {
      const { quantityDistributed, commandId, articleId } = req.body;

      if (quantityDistributed === 0 || articleId === 0 || commandId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });

      if (quantityDistributed < 0)
        return res.status(400).json({
          msg: `La quantité distribuée ne peut être négative.`,
        });

      const newDistribution = {
        dateDescription: new Date(),
        quantityDistributed,
        commandId,
        articleId,
      };
      await Distributions.create(newDistribution);
      res.json({ msg: "Distribution effectuée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const distribution = await Distributions.findByPk(req.params.id, {
        include: [{ model: Articles }, { model: Commands }],
      });
      if (distribution) {
        res.json(distribution);
      } else {
        return res.status(404).json({ msg: "Non trouvée" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const distribution = await Distributions.findAll({
        include: [{ model: Articles }, { model: Commands }],
      });
      if (distribution) {
        res.json(distribution);
      } else {
        return res.status(404).json({ msg: "Non trouvée" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {supplierId
      const id = req.params.id;
      const { quantityDistributed, commandId, articleId } = req.body;
      const distribution = await Distributions.findOne({ where: { id: id } });
      if (!distribution) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (quantityDistributed === 0 || articleId === 0 || commandId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });

      if (quantityDistributed < 0)
        return res.status(400).json({
          msg: `La quantité distribuée ne peut être négative.`,
        });

      if (
        procurement.quantityDistributed !== quantityDistributed ||
        procurement.articleId !== articleId ||
        procurement.commandId !== commandId ||
      )
        await Articles.update(
          {
            dateDescription: new Date(),
            quantityDistributed,
            commandId,
            articleId,
          },
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
      const distributionById = await Distributions.findOne({ where: { id: id } });
      if (!distributionById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      await Distributions.destroy({ where: { id: id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = distributionCtrl;
