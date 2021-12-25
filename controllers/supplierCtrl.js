const { Suppliers, Procurements } = require("../models");

const supplierCtrl = {
  register: async (req, res) => {
    try {
      const { name, contact } = req.body;
      if (!name || !contact)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });
      const supplierName = await Suppliers.findOne({ where: { name } });
      if (supplierName)
        return res
          .status(400)
          .json({ msg: `Le fournisseur : ${supplierName.name} existe déjà.` });
      const supplierContact = await Suppliers.findOne({
        where: { contact },
      });
      if (supplierContact)
        return res.status(400).json({
          msg: `Le contact : ${supplierContact.contact}  existe déjà.`,
        });
      if (contact.length < 10 || contact.length > 10)
        return res.status(400).json({
          msg: "Le contact doit comporter 10 caractères. (ex:082xxxxxxx)",
        });

      const newSupplier = { name, contact };
      await Suppliers.create(newSupplier);
      res.json({ msg: "Fournisseur ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const supplier = await Suppliers.findByPk(id, { include: Procurements });
      if (!supplier) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      res.json(supplier);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const customers = await Suppliers.findAll({ include: Procurements });
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
      const supplierById = await Suppliers.findOne({ where: { id: id } });
      if (!supplierById) {
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
      const supplierName = await Suppliers.findOne({ where: { name } });
      if (!supplierName) await Suppliers.update({ name }, { where: { id: id } });
      const supplierContact = await Suppliers.findOne({ where: { contact } });
      if (!supplierContact)
        await Suppliers.update({ contact }, { where: { id: id } });
      if (!supplierContact && !supplierName)
        await Suppliers.update({ name, contact }, { where: { id: id } });
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
      await Suppliers.destroy({ where: { id: id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = supplierCtrl;
