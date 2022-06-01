'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Settlements', [
      { name: 'A credit', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Au comptant', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Carte bleu', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chèque', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Settlements', null, {});
  },
};
