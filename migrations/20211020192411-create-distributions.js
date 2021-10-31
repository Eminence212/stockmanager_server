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
      dateDescription: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      quantityDistributed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      distributionPrice: {
        type: Sequelize.FLOAT(24, 2),
        allowNull: false,
        defaultValue: 0,
      },
      distributionTva: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      commandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Commands",
          key: "id",
        },
      },
      articleId: {
        type: Sequelize.INTEGER,
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
