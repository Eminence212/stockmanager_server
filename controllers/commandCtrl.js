const {
  sequelize,
  Distributions,
  Commands,
  Status,
  Customers,
} = require('../models');
const commandCtrl = {
  register: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { statusId, customerId, articles } = req.body;

      if (articles.length == 0)
        return res.status(400).json({
          msg: 'Cette commande est vide. Veuillez ajouter un ou plusieurs articles.',
        });

      if (statusId <= 0)
        return res.status(400).json({
          msg: `Veuillez sélectionner un status.`,
        });
      if (customerId <= 0)
        return res.status(400).json({
          msg: `Veuillez sélectionner un client.`,
        });

      const cmd = await Commands.create(
        {
          dateCommand: new Date(),
          statusId,
          customerId,
        },
        { transaction: t }
      );
      articles.map(article => {
        await Distributions.create(
          {
            dateDescription: new Date(),
            quantityDistributed: article.quantite,
            distributionPrice: article.price,
            distributionTva: article.tva,
            commandId: cmd.id,
            articleId: article.id,
          },
          { transaction: t }
        );
      });
      await t.commit();
      res.json({ msg: 'Commande ajoutée avec succès !' });
    } catch (error) {
      await t.rollback();
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const command = await Commands.findByPk(req.params.id, {
        include: [{ model: Status }, { model: Customers }],
      });
      if (command) {
        res.json(command);
      } else {
        return res.status(404).json({ msg: 'Non trouvée' });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const commands = await Commands.findAll({
        include: [{ model: Status }, { model: Customers }],
      });
      if (commands) {
        res.json(commands);
      } else {
        return res.status(404).json({ msg: 'Non trouvée' });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { statusId, customerId } = req.body;
      const command = await Commands.findOne({ where: { id: id } });
      if (statusId === 0 || customerId == 0)
        return res
          .status(400)
          .json({ msg: 'Veuillez remplir les champs vide.' });

      if (statusId < 0)
        return res.status(400).json({
          msg: `Le status choisie n'existe pas.`,
        });
      if (customerId < 0)
        return res.status(400).json({
          msg: `Le client choisie n'existe pas.`,
        });

      if (command.statusId !== statusId || command.customerId !== customerId)
        await Commands.update(
          {
            statusId,
            customerId,
          },
          { where: { id: id } }
        );
      res.json({ msg: 'Mise à jour réussie !' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const commandById = await Commands.findOne({ where: { id: id } });
      if (!commandById) {
        return res.status(404).json({ msg: 'Non trouvée' });
      }
      if (!id)
        return res
          .status(400)
          .json({ msg: "L'identifiant de la commande est vide." });
      await Commands.destroy({ where: { id: id } });
      res.json({ msg: 'Supprimée avec succès !' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = commandCtrl;
