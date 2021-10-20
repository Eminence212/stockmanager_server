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
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.FLOAT(24, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tva: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      threshold: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      minQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      familyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Families",
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
