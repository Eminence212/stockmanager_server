const { Fournisseur } = require("../models");

const fournisseurController = {
  register: async (req, res) => {
    try {
      const { nom, contact } = req.body;
      if (!nom || !contact)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });
      const fournisseurName = await Fournisseur.findOne({ where: { nom } });
      if (fournisseurName)
        return res
          .status(400)
          .json({ msg: `Le client : ${fournisseurName.nom} existe déjà.` });
      const fournisseurContact = await Fournisseur.findOne({
        where: { contact },
      });
      if (fournisseurContact)
        return res.status(400).json({
          msg: `Le contact : ${fournisseurContact.contact}  existe déjà.`,
        });
      if (contact.length < 10 || contact.length > 10)
        return res.status(400).json({
          msg: "Le contact doit comporter 10 caractères. (ex:082xxxxxxx)",
        });

      const nouveauFournisseur = { nom, contact };
      await Fournisseur.create(nouveauFournisseur);
      res.json({ msg: "Fournisseur ajouté avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const customerById = await Fournisseur.findOne({ where: { id: id } });
      if (!customerById) {
        return res.status(404).json({ msg: "Non trouvé" });
      }
      const customer = await Fournisseur.findByPk(id);
      res.json(customer);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const customers = await Fournisseur.findAll();
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
      const customerById = await Fournisseur.findOne({ where: { id: id } });
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
      const customerName = await Fournisseur.findOne({ where: { nom } });
      if (!customerName)
        await Fournisseur.update({ nom }, { where: { id: id } });
      const customerContact = await Fournisseur.findOne({ where: { contact } });
      if (!customerContact)
        await Fournisseur.update({ contact }, { where: { id: id } });
      if (!customerContact && !customerName)
        await Fournisseur.update({ nom, contact }, { where: { id: id } });
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
      await Fournisseur.destroy({ where: { id: id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = fournisseurController;