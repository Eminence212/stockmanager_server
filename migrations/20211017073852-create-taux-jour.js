"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Taux_jours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      taux: {
        allowNull: false,
        type: Sequelize.FLOAT(10, 2),
      },
      date_taux: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      monnaieId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Monnaies",
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
    await queryInterface.dropTable("Taux_jours");
  },
};
