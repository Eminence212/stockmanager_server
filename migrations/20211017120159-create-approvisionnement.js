"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Approvisionnements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date_approvisionnement: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      folio: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      quantite_approvisionnee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      prix_achat: {
        type: Sequelize.FLOAT(24, 6),
        allowNull: false,
        defaultValue: 0.0,
      },
      articleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Articles",
          key: "id",
        },
      },
      fournisseurId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Fournisseurs",
          key: "id",
        },
      },
      uniteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Unites",
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
    await queryInterface.dropTable("Approvisionnements");
  },
};
