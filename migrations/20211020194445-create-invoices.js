"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      internalNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      invoiceDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      receiptNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      settlementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Settlements",
          key: "id",
        },
      },
      commandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Commands",
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
    await queryInterface.dropTable("Invoices");
  },
};
