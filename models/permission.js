const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('.');

class Permission extends Model {
    static async getAllForUser(user) {
        return await this.findAll({where: {user}});
    }
}

Permission.structure = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    perms: {
        type: DataTypes.JSONB,
        allowNull: false
    }
};

let init = (sequelize, DataTypes) => {
    let perm = Permission.init(Permission.structure, {
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions'
    })
};

init.class = Permission;
module.exports = init;