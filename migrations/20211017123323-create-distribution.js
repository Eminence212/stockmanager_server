"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Distributions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date_distribution: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quantite_distribuee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      commandeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Commandes",
          key: "id",
        },
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Articles",
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
    await queryInterface.dropTable("Distributions");
  },
};
