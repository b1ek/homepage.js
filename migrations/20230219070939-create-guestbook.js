'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    const struct = require('../models').Guestbook.structure;
    await queryInterface.createTable('guestbook', struct);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('guestbook');
  }
};