"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Rates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dateRate: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: true,
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      currencieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Currencies",
          key:"id"
        }
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
    await queryInterface.dropTable("Rates");
  },
};
