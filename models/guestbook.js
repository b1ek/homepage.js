const { Model, DataTypes } = require('sequelize');

class Guestbook extends Model {
  
}

Guestbook.structure = {
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
};

/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @returns Guestbook
 */
const init = (sequelize, DataTypes) => {
  let model = Guestbook.init(Guestbook.structure, {
    sequelize,
    modelName: 'Guestbook',
    tableName: 'guestbook'
  });
  return model;
};

init.class = Guestbook;
module.exports = init;