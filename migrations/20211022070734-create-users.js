"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue:
          "https://res.cloudinary.com/eminence/image/upload/v1634481360/avatar/421-4212341_default-avatar-svg-hd-png-download_miwlsi.png",
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, //0 : client, 1: admin , 2 : caisse & facturation , 3 : Livraison / Vente
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
    await queryInterface.dropTable("Users");
  },
};
