const { Customers, Commands, Status, Distributions } = require("../models");
const customerCtrl = {
  register: async (req, res) => {
    try {
      const { name, contact } = req.body;
      if (!name || !contact)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });
      const customerName = await Customers.findOne({ where: { name } });
      if (customerName)
        return res
          .status(400)
          .json({ msg: `Le client : ${customerName.name} existe déjà.` });
      const customerContact = await Customers.findOne({ where: { contact } });
      if (customerContact)
        return res.status(400).json({
          msg: `Le contact : ${customerContact.contact}  existe déjà.`,
        });
      if (contact.length < 10 || contact.length > 10)
        return res.status(400).json({
          msg: "Le contact doit comporter 10 caractères. (ex:082xxxxxxx)",
        });

      const newCustomer = { name, contact };
      await Customers.create(newCustomer);
      res.json({ msg: "Client ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const customer = await Customers.findByPk(id, { include: Commands });
      if (!customer) {
        return res.status(404).json({ msg: "Non trouvé" });
      }

      res.json(customer);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const customers = await Customers.findAll({
        include: {
          model: Commands,
          include: [
            { model: Status },
            { model: Distributions },
          ],
        },
      });
      if (!customers) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      res.json(customers);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const customerById = await Customers.findOne({ where: { id: id } });
      if (!customerById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      const { name, contact } = req.body;
      if (!name || !contact)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });
      if (contact.length < 10 || contact.length > 10)
        return res.status(400).json({
          msg: "Le contact doit comporter 10 caractères. (ex:082xxxxxxx)",
        });
      const customerName = await Customers.findOne({ where: { name } });
      if (!customerName)
        await Customers.update({ name }, { where: { id: id } });
      const customerContact = await Customers.findOne({ where: { contact } });
      if (!customerContact)
        await Customers.update({ contact }, { where: { id: id } });
      if (!customerContact && !customerName)
        await Customers.update({ name, contact }, { where: { id: id } });
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
      await Customers.destroy({ where: { id: id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = customerCtrl;
