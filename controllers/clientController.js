const { Client,Commande} = require("../models");
const clientController = {
  register: async (req, res) => {
    try {
      const { nom, contact } = req.body;
      if (!nom || !contact)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });
      const customerName = await Client.findOne({ where: { nom } });
      if (customerName)
        return res
          .status(400)
          .json({ msg: `Le client : ${customerName.nom} existe déjà.` });
      const customerContact = await Client.findOne({ where: { contact } });
      if (customerContact)
        return res.status(400).json({
          msg: `Le contact : ${customerContact.contact}  existe déjà.`,
        });
      if (contact.length < 10 || contact.length > 10)
        return res.status(400).json({
          msg: "Le contact doit comporter 10 caractères. (ex:082xxxxxxx)",
        });

      const newCustomer = { nom, contact };
      await Client.create(newCustomer);
      res.json({ msg: "Client ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const customerById = await Client.findOne(
        { where: { id: id } },
        { include: Commande }
      );
      if (!customerById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      const customer = await Client.findByPk(id);
      res.json(customer);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const customers = await Client.findAll({ include: Commande });
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
      const customerById = await Client.findOne({ where: { id: id } });
      if (!customerById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      const { nom, contact } = req.body;
      if (!nom || !contact)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });
      if (contact.length < 10 || contact.length > 10)
        return res.status(400).json({
          msg: "Le contact doit comporter 10 caractères. (ex:082xxxxxxx)",
        });
      const customerName = await Client.findOne({ where: { nom } });
      if (!customerName) await Client.update({ nom }, { where: { id: id } });
      const customerContact = await Client.findOne({ where: { contact } });
      if (!customerContact)
        await Client.update({ contact }, { where: { id: id } });
      if (!customerContact && !customerName)
        await Client.update({ nom, contact }, { where: { id: id } });
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
      await Client.destroy({ where: { id: id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = clientController;
