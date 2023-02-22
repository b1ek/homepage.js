'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */
  async up (queryInterface, DataTypes) {
    queryInterface.createTable('articles', {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
        title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
        shortText: {
        type: DataTypes.TEXT,
        allowNull: false
      },
        body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
        submitted: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
        edited: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
        submitter: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    });
  },

  /** @param {import('sequelize').QueryInterface} queryInterface */
  async down (queryInterface, DataTypes) {
    if (await queryInterface.tableExists('articles')) {
      await queryInterface.dropTable('articles');
    }
  }
};
