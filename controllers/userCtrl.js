const { Users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, password, role } = req.body;
      if (!name || !password)
        return res
          .status(400)
          .json({ msg: 'Veuillez remplir tous les champs.' });
      const user = await Users.findOne({ where: { name } });
      if (user)
        return res
          .status(400)
          .json({ msg: "Ce nom d'utilisateur existe déjà." });

      if (password.length < 6)
        return res.status(400).json({
          msg: 'Le mot de passe doit comporter au moins 6 caractères.',
        });
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        password: passwordHash,
        role,
      };

      const activation_token = createActivationToken(newUser);

      // const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      const url = `/user/activate/${activation_token}`;
      // sendMail(email, url,'Confirmer adresse Email');

      await Users.create(newUser);
      res.json({
        msg: 'Enregistrement réussi !',
        url: url,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  activateAccount: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const { name, password } = user;

      const check = await Users.findOne({ where: { name } });
      if (check)
        return res
          .status(400)
          .json({ msg: "Ce nom d'utilisateur existe déjà." });
      const newUser = { name, password };
      await Users.create(newUser);
      res.json({ msg: 'Votre compte a été activé !' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { name, password } = req.body;
      const user = await Users.findOne({ where: { name } });
      if (!user)
        return res
          .status(400)
          .json({ msg: "Ce nom d'utilisateur n'existe pas." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: 'Le mot de passe est incorrect.' });
      if (user.role < 0)
        return res.status(400).json({ msg: `${user.name} n'est pas autorisé d'utilisé la plate forme car il est désactivé.` });
      const refresh_token = createRefreshToken({ id: user.id });
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      });
      res.json({ msg: 'Connexion réussie !', refresh_token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      // const rf_token = req.cookies.refreshtoken;
      const { refresh_token } = req.body;
      if (!refresh_token)
        return res
          .status(400)
          .json({ msg: 'Veuillez vous connecter maintenant !' });
      jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err)
            return res
              .status(400)
              .json({ msg: 'Veuillez vous connecter maintenant !' });
          const access_token = createAccessToken({ id: user.id });
          res.json({ access_token });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { name } = req.body;
      const user = await Users.findOne({ where: { name } });
      if (!user)
        return res
          .status(400)
          .json({ msg: "Ce nom d'utilisateur n'existe pas." });
      const access_token = createAccessToken({ id: user.id });
      // const url = `${CLIENT_URL}/user/reset/${access_token}`;
      const url = `/user/reset/${access_token}/${user.id}`;

      // sendMail(email,url,"Reset your password")

      res.json({
        url: url,
        access_token: access_token,
        id: user.id,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password, id } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      await Users.update({ password: passwordHash }, { where: { id: id } });
      res.json({ msg: 'Le mot de passe a été changé avec succès !' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await Users.findByPk(req.user.id, {
        attributes: ['id', 'name', 'avatar', 'role'],
      });
      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      const users = await Users.findAll();
      res.json(users);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
      return res.json({ msg: 'Déconnecté.' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, role } = req.body;
      const userById = await Users.findOne({ where: { id: id } });
      if (!userById) {
        return res.status(404).json({ msg: 'Non trouvé' });
      }

      await Users.update(
        {
          name: name ? name : userById.name,
          role: role ? role : userById.role,
        },
        { where: { id: id } }
      );
      res.json({ msg: 'Mise à jour effectuée avec succès !!' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateAvatar: async (req, res) => {
    try {
      const { avatar } = req.body;
      await Users.update({ avatar }, { where: { id: req.user.id } });
      res.json({ msg: 'Mise à jour réussie !' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body;
      await Users.update({ role }, { where: { id: req.params.id } });
      res.json({ msg: "L'utilisateur a été désactivé !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateUserProfile: async (req, res) => {
    try {
      const { name, password, role, avatar } = req.body;
      await Users.update(
        { name, password, role, avatar },
        { where: { id: req.params.id } }
      );
      res.json({ msg: 'Profile mise à jour !' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await Users.destroy({ where: { id: req.params.id } });
      res.json({ msg: 'Supprimé avec succès !' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
const createActivationToken = payload => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m',
  });
};
const createAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '55m',
  });
};
const createRefreshToken = payload => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '5d',
  });
};
module.exports = userCtrl;
