const { Rates } = require("../models");
const rateCtrl = {
  register: async (req, res) => {
    try {
      const { value, currencieId } = req.body;
      if (value === 0 || currencieId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });
      const rate = await Rates.findOne({ where: { dateRate: new Date() } });
      if (rate)
        return res
          .status(400)
          .json({ msg: `Le taux existe déjà pour aujourd'hui.` });

      if (value.length < 0)
        return res.status(400).json({
          msg: "Le taux ne peut être négatif.",
        });
      if (currencieId.length < 0)
        return res.status(400).json({
          msg: `La monnaie choisie n'existe pas.`,
        });

      const newRate = { dateRate: new Date(), value, currencieId };
      await Rates.create(newRate);
      res.json({ msg: "Taux ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const rate = await Rates.findByPk(id);
      if (!rate) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      res.json(rate);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const rates = await Rates.findAll();
      if (!rates) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      res.json(rates);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const rateById = await Rates.findOne({ where: { id: id } });
      if (!rateById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      const { value, currencieId } = req.body;
      if (value === 0 || currencieId === 0)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });
      if (value.length < 0)
        return res.status(400).json({
          msg: "Le taux ne peut être négatif.",
        });
      if (currencieId.length < 0)
        return res.status(400).json({
          msg: `La monnaie choisie n'existe pas.`,
        });

      await Rates.update({ value, currencieId }, { where: { id: id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant du client est vide." });
      await Rates.destroy({ where: { id: id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = rateCtrl;
