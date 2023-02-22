'use strict';

require('pg').defaults.parseInt8 = true

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'production';
let config = require(__dirname + '/../config/config.json')[env];

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

/** @type Sequelize */
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = require('./user')(sequelize, sequelize.DataTypes);
db.Guestbook = require('./guestbook')(sequelize, sequelize.DataTypes);
db.Article = require('./article')(sequelize, sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync();

module.exports = db;
