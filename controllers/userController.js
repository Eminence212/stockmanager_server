const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const sendMail = require("./sendMail");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const userController = {
  register: async (req, res) => {
    try {
      const { name, password } = req.body;
      if (!nom || !password)
        return res
          .status(400)
          .json({ msg: "Veuillez remplir tous les champs." });
      const user = await User.findOne({ where: { nom } });
      if (user)
        return res
          .status(400)
          .json({ msg: "Ce nom d'utilisateur existe déjà." });

      if (password.length < 6)
        return res.status(400).json({
          msg: "Le mot de passe doit comporter au moins 6 caractères.",
        });
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        nom,
        password: passwordHash,
      };

      const activation_token = createActivationToken(newUser);

      // const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      const url = `/user/activate/${activation_token}`;
      // sendMail(email, url,'Confirmer adresse Email');
      res.json({
        msg: "Enregistrement réussi ! Veuillez activer votre compte.",
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
      const { nom, password } = user;

      const check = await Models.User.findOne({ where: { nom } });
      if (check)
        return res
          .status(400)
          .json({ msg: "Ce nom d'utilisateur existe déjà." });
      const newUser = { nom, password };
      await User.create(newUser);
      res.json({ msg: "Votre compte a été activé !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { nom, password } = req.body;
      const user = await User.findOne({ where: { nom } });
      if (!user)
        return res
          .status(400)
          .json({ msg: "Ce nom d'utilisateur n'existe pas." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Le mot de passe est incorrect." });

      const refresh_token = createRefreshToken({ id: user.id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      });
      res.json({ msg: "Connexion réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res
          .status(400)
          .json({ msg: "Veuillez vous connecter maintenant !" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res
            .status(400)
            .json({ msg: "Veuillez vous connecter maintenant !" });
        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { nom } = req.body;
      const user = await User.findOne({ where: { non } });
      if (!user)
        return res
          .status(400)
          .json({ msg: "Ce nom d'utilisateur n'existe pas." });
      const access_token = createAccessToken({ id: user.id });
      // const url = `${CLIENT_URL}/user/reset/${access_token}`;
      const url = `/user/reset/${access_token}`;

      // sendMail(email,url,"Reset your password")

      res.json({
        msg: "Envoyez à nouveau le mot de passe",
        url: url,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      await User.update(
        { password: passwordHash },
        { where: { id: req.user.id } }
      );
      res.json({ msg: "Le mot de passe a été changé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ["id", "nom", "avatar", "role"],
      });
      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ["id", "nom", "avatar", "role"],
      });
      res.json(users);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Déconnecté." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateAvatar: async (req, res) => {
    try {
      const { avatar } = req.body;
      await User.update({ avatar }, { where: { id: req.user.id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body;
      await User.update({ role }, { where: { id: req.params.id } });
      res.json({ msg: "Mise à jour réussie !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.destroy({ where: { id: req.params.id } });
      res.json({ msg: "Supprimé avec succès !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "55m",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5d",
  });
};
module.exports = userController;