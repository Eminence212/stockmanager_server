"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Factures", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      numero_interne: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      date_facture: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      numero_recu: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      reglementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Modere_reglements",
          key: "id",
        },
      },
      commandeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Commandes",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Factures");
  },
};
