const { Article,Famille} = require("../models");
const articleController = {
  register: async (req, res) => {
    try {
      const {
        reference,
        designation,
        prix,
        tva,
        seuil,
        quantite_min,
        familleId,
      } = req.body;

      if (!reference || !designation || familleId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });
      const _reference = await Article.findOne({ where: { reference } });
      if (_reference)
        return res.status(400).json({
          msg: `La référence : ${_reference.reference} existe déjà.`,
        });
      const _designation = await Article.findOne({ where: { designation } });
      if (_designation)
        return res.status(400).json({
          msg: `La désignation : ${_designation.designation} existe déjà.`,
        });

      if (tva < 0)
        return res.status(400).json({
          msg: `La TVA ne peut être négative.`,
        });
      if (seuil < 0)
        return res.status(400).json({
          msg: `Le seuil de réapprovisionnement ne peut être négatif.`,
        });
      if (quantite_min < 0)
        return res.status(400).json({
          msg: `La quantité de stock minimal ne peut être négative.`,
        });
      if (familleId < 0)
        return res.status(400).json({
          msg: `La famille choisie n'existe pas.`,
        });
      const newArticle = {
        reference,
        designation,
        prix_vente: prix,
        tva,
        seuil_reapprovisionnement: seuil,
        quante_min: quantite_min,
        familleId,
      };
      await Article.create(newArticle);
      res.json({ msg: "Article ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const article = await Article.findByPk(req.params.id, {
        include: Famille,
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
      const articles = await Article.findAll({ include: Famille });
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
        prix,
        tva,
        seuil,
        quantite_min,
        familleId,
      } = req.body;
      const article = await Famille.findOne({ where: { id: id } });
      if (!article) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!reference || !designation || familleId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir les champs vide." });
      if (tva < 0)
        return res.status(400).json({
          msg: `La TVA ne peut être négative.`,
        });
      if (seuil < 0)
        return res.status(400).json({
          msg: `Le seuil de réapprovisionnement ne peut être négatif.`,
        });
      if (quantite_min < 0)
        return res.status(400).json({
          msg: `La quantité de stock minimal ne peut être négative.`,
        });
      if (familleId < 0)
        return res.status(400).json({
          msg: `La famille choisie n'existe pas.`,
        });

      if (
        article.reference !== reference ||
        article.designation !== designation ||
        article.prix_vente !== prix ||
        article.tva !== tva ||
        article.seuil_reapprovisionnement !== seuil ||
        article.quantite_min !== quantite_min ||
        article.familleId !== familleId
      )
        await Article.update(
          {
            reference,
            designation,
            prix_vente: prix,
            tva,
            seuil_reapprovisionnement: seuil,
            quante_min: quantite_min,
            familleId,
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
      const articleById = await Article.findOne({ where: { id: id } });
      if (!articleById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant de l'article est vide." });
      await Article.destroy({ where: { id: id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = articleController;
