
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */
  async up (queryInterface, Sequelize) {
    const struct = require('../models').User.structure;
    await queryInterface.createTable('users', struct);
  },

  /** @param {import('sequelize').QueryInterface} queryInterface */
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
