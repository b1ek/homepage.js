const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('.');

/** @type {{data: Permission[], updated: number, expired: function}} */
let cached = {
    data: undefined,
    updated: 0,
    expired: () => {
        return (Date.now() - updated) >= 1000
    }
}

class Permission extends Model {
    static async cache() {
        if (!cached.expired()) return;

        cached.data = await Permission.findAll();
        cached.updated = Date.now();
    }

    /**
     * Get value from cache
     * @param {number} user 
     * @param {string} permission 
     * @returns {Permission?}
     */
    static async findFromCache(user, permission) {
        await this.cache();
        for (const perm of cached.data) {
            if (perm.user == userid && perm.permission == permission)
                return perm;
        }
        return null;
    }

    /**
     * Get a permission for user
     * @param {number} user 
     * @param {string} permission 
     * @returns {boolean}
     */
    static async forUser(user, permission) {
        await this.cache();
        const data = await this.findFromCache(user, permission);
        if (!data) return false;
        return data.value != 0;
    }

    /**
     * Set a permission for user
     * @param {number} user
     * @param {string} permission
     * @param {number} value
     * @returns {Permission}
     */
    static async set(user, permission, value) {
        const existing =    await Permission.findOne({where: {user, permission}});

        let perm;

        if (!existing)      perm = await Permission.create({user, permission, value});
        else                perm = await Permission.update({user, permission, value}, {where: {user, permission}});
        await this.cache();

        return perm;
    }

    static async userAllowed(user, permission) {
        return this.forUser(user, permission);
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
    permission: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    value: {
        type: DataTypes.BIGINT,
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