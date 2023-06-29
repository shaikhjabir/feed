'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user', {
      UUID: {
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING(30),
      },
      role: {
        type: DataTypes.ENUM("Super Admin","Admin", "Basic"),
      },
      email: {
        type: DataTypes.STRING(50),
      },
      password: {
        type: DataTypes.STRING(100),
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};
