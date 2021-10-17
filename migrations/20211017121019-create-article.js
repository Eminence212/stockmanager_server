"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Articles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reference: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      designation: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      prix_vente: {
        type: Sequelize.FLOAT(24, 6),
        allowNull: false,
        defaultValue: 0.0,
      },
      tva: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      seuil_reapprovisionnement: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      quante_min: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      familleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Familles",
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
    await queryInterface.dropTable("Articles");
  },
};
