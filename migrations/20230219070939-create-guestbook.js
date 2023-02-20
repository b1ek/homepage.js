'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('guestbook', {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      email: DataTypes.TEXT,
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      hidemail: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      ip: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      time: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Guestbooks');
  }
};