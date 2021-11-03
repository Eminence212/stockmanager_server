module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Procurements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      procurementDate: {
        type: Sequelize.DATE,
      },
      folio: Sequelize.STRING(50),
      initQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      supplyQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      purchasePrice: {
        type: Sequelize.FLOAT(24, 2),
        defaultValue: 0,
      },
      articleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Articles",
          key: "id",
        },
      },
      supplierId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Suppliers",
          key: "id",
        },
      },
      unitId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Units",
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
    await queryInterface.dropTable("Procurements");
  },
};
