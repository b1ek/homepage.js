'use strict';

require('pg').defaults.parseInt8 = true

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'production';
let config = require(__dirname + '/../config/config.json')[env];

class Models {
  sequelize = Sequelize
  Sequelize = Sequelize

  User = require('./user').class
  Article = require('./article').class
  Guestbook = require('./guestbook').class
}

/**
 * @type Models
 */
const db = {};

const {
  DB_PASSWORD,
  DB_USERNAME,
  DB_DATABASE,
  DB_HOSTNAME
} = process.env;
config = {
  ...config,
  username: DB_USERNAME || config.username,
  password: DB_PASSWORD || config.password,
  database: DB_DATABASE || config.database,
  host:     DB_HOSTNAME || config.host,
  define: {
    timestamps: false
  }
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync();

module.exports = db;
