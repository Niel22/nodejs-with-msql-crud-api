'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Health',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Technology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Science',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mobile',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', {}, null);
  }
};
