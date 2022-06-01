('use strict');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { USER, PASSWORD } = process.env;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: USER,
        password: await bcrypt.hash(PASSWORD, 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};
