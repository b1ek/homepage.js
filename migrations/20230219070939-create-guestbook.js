'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    const struct = require('../models').Guestbook.structure;
    await queryInterface.createTable('guestbook', struct);
  },
  async down(queryInterface, Sequelize) {
    if (await queryInterface.tableExists('guestbook')) {
      await queryInterface.dropTable('guestbook');
    }
  }
};