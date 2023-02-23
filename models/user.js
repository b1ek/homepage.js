const { Model, DataTypes } = require('sequelize');

class User extends Model {

}

const structure = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    login: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    pass: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    totp: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    totpRec: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    gpgkey: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    accessLevel: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    }
}
User.structure = structure

/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @returns User
 */
const init = (sequelize, DataTypes) => {
    let user = User.init(structure, {
        sequelize,
        tableName: 'users',
        tableName: 'users'
    });

    return user;
}

init.class = User;
module.exports = init;