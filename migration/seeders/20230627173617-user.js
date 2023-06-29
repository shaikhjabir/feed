'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    
     await queryInterface.bulkInsert('user', [{
      UUID: '1e7cde7f-0d1f-44f3-bdca-644c8987246a',
      name: "admin",
      role: 'Super Admin',
      email: 'superadmin@gmail.com',
      password:'6677384886365822e3e5f2898a7b90b7cdfeb147eb1d89f719ddc4e0ff3f6d90',
      createdAt:new Date(),
      updatedAt: new Date()
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
