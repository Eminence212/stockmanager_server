const { Invoices, Commands, Settlements } = require('../models');
const invoiceCtrl = {
  register: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const {
        internalNumber,
        receiptNumber,
        settlementId,
        commandId,
        statusId,
        customerId,
      } = req.body;
      if (
        !internalNumber ||
        !receiptNumber ||
        settlementId === 0 ||
        commandId == 0
      )
        return res
          .status(400)
          .json({ msg: 'Veuillez remplir les champs vide.' });
      const invoice = await Invoices.findOne({
        where: { internalNumber },
      });
      if (invoice)
        return res.status(400).json({
          msg: `Commande déjà facturée pour le numéro : ${internalNumber}`,
        });
      await Invoices.create(
        {
          internalNumber,
          invoiceDate: new Date(),
          receiptNumber,
          settlementId,
          commandId,
        },
        { transaction: t }
      );
      await Commands.update(
        {
          statusId,
          customerId,
        },
        { where: { id: commandId } },
        { transaction: t }
      );
      await t.commit();
      res.json({ msg: 'Facturation effectuée avec succès !' });
    } catch (error) {
      await t.rollback();
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const invoice = await Invoices.findByPk(req.params.id, {
        include: [{ model: Commands }, { model: Settlements }],
      });
      if (invoice) {
        res.json(invoice);
      } else {
        return res.status(404).json({ msg: 'Non trouvée' });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const invoices = await Invoices.findAll({
        include: [{ model: Commands }, { model: Settlements }],
      });
      if (invoices) {
        res.json(invoices);
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
      const { internalNumber, receiptNumber, settlementId, commandId } =
        req.body;
      if (
        !internalNumber ||
        !receiptNumber ||
        settlementId === 0 ||
        commandId == 0
      )
        return res
          .status(400)
          .json({ msg: 'Veuillez remplir les champs vide.' });
      await Invoices.update(
        {
          internalNumber,
          receiptNumber,
          settlementId,
          commandId,
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
      await Invoices.destroy({ where: { id: id } });
      res.json({ msg: 'Supprimée avec succès !' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = invoiceCtrl;
