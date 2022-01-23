const {
  Articles,
  Families,
  Stocks,
  Procurements,
  Distributions,
  sequelize,
} = require("../models");
const articleCtrl = {
  register: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const {
        reference,
        designation,
        price,
        tva,
        threshold,
        minQuantity,
        familyId,
      } = req.body;

      if (!reference || !designation || familyId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });
      const _reference = await Articles.findOne({ where: { reference } });
      if (_reference)
        return res.status(400).json({
          msg: `La référence : ${_reference.reference} existe déjà.`,
        });
      const _designation = await Articles.findOne({ where: { designation } });
      if (_designation)
        return res.status(400).json({
          msg: `La désignation : ${_designation.designation} existe déjà.`,
        });

      if (tva < 0)
        return res.status(400).json({
          msg: `La TVA ne peut être négative.`,
        });
      if (threshold < 0)
        return res.status(400).json({
          msg: `Le seuil de réapprovisionnement ne peut être négatif.`,
        });
      if (minQuantity < 0)
        return res.status(400).json({
          msg: `La quantité de stock minimal ne peut être négative.`,
        });
      if (familyId < 0)
        return res.status(400).json({
          msg: `La famille choisie n'existe pas.`,
        });
      const newArticle = {
        reference,
        designation,
        price,
        tva,
        threshold,
        minQuantity,
        familyId,
      };
      const article = await Articles.create(newArticle, { transaction: t });
      await Stocks.create(
        { quantityStock: 0, articleId: article.id },
        { transaction: t }
      );
      await t.commit();
      res.json({ msg: "Article ajouté avec succès !" });
    } catch (error) {
      await t.rollback();
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const article = await Articles.findByPk(req.params.id, {
        include: [{ model: Stocks }, { model: Families }],
      });
      if (article) {
        res.json(article);
      } else {
        return res.status(404).json({ msg: "Non trouvé" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const articles = await Articles.findAll({
        include: [
          { model: Stocks },
          { model: Families },
          { model: Procurements },
          { model: Distributions },
        ],
      });
      if (articles) {
        res.json(articles);
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
      const {
        reference,
        designation,
        price,
        tva,
        threshold,
        minQuantity,
        familyId,
      } = req.body;
      const article = await Articles.findOne({ where: { id: id } });
      if (!article) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!reference || !designation || familyId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });
      if (tva < 0)
        return res.status(400).json({
          msg: `La TVA ne peut être négative.`,
        });
      if (threshold < 0)
        return res.status(400).json({
          msg: `Le seuil de réapprovisionnement ne peut être négatif.`,
        });
      if (minQuantity < 0)
        return res.status(400).json({
          msg: `La quantité de stock minimal ne peut être négative.`,
        });
      if (familyId < 0)
        return res.status(400).json({
          msg: `La famille choisie n'existe pas.`,
        });

      if (
        article.reference !== reference ||
        article.designation !== designation ||
        article.price !== price ||
        article.tva !== tva ||
        article.threshold !== threshold ||
        article.minQuantity !== minQuantity ||
        article.familyId !== familyId
      )
        await Articles.update(
          {
            reference,
            designation,
            price,
            tva,
            threshold,
            minQuantity,
            familyId,
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
      const articleById = await Articles.findOne({ where: { id: id } });
      if (!articleById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant de l'article est vide." });
      await Articles.destroy({ where: { id: id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = articleCtrl;
