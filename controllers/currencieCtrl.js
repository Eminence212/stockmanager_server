const { Currencies, Rates } = require("../models");

const currencieCtrl = {
  register: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });
      const currencie = await Currencies.findOne({
        where: { name },
      });
      if (currencie)
        return res.status(400).json({
          msg: `La monnaie : ${currencie.name} existe déjà.`,
        });

      await Currencies.create({ name });
      res.json({ msg: "Monnaie ajoutée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const { Currencies, Rates } = require("../models");
      const currencie = await Currencies.findByPk(req.params.id, {
        include: Rates,
      });
      if (currencie) {
        res.json(currencie);
      } else {
        return res.status(404).json({ msg: "Non trouvée" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const currencies = await Currencies.findAll({
        include: Rates,
      });
      if (currencies) {
        res.json(currencies);
      } else {
        return res.status(404).json({ msg: "Non trouvée" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const currenciesById = await Currencies.findOne({ where: { id: id } });
      if (!currenciesById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!name)
        return res.status(400).json({ msg: "Veuillez remplir le champ vide." });

      const currencie = await Currencies.findOne({
        where: { name },
      });
      if (!currencie) await Currencies.update({ name }, { where: { id: id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const currencieById = await Currencies.findOne({ where: { id: id } });
      if (!currencieById) {
        return res.status(404).json({ msg: "Non trouvée" });
      }
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant de la monnaie est vide." });
      await Currencies.destroy({ where: { id: id } });
      res.json({ msg: "Supprimée avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = currencieCtrl;
