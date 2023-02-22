'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */
  async up (queryInterface, DataTypes) {
    const struct = require('../models').Article.structure;
    queryInterface.createTable('articles', struct);
  },

  /** @param {import('sequelize').QueryInterface} queryInterface */
  async down (queryInterface, DataTypes) {
    if (await queryInterface.tableExists('articles')) {
      await queryInterface.dropTable('articles');
    }
  }
};
