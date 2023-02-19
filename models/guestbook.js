'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guestbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Guestbook.init({
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
      type: DataTypes.BIGINT
    }
  }, {
    sequelize,
    modelName: 'Guestbook',
  });
  return Guestbook;
};