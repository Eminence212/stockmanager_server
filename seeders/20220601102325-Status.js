'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Statuses', [
      { name: 'Annulée', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'En attente de paiement',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Payée, distribuée ou livrée',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Payée, non distribuée',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Statuses', null, {});
  },
};
