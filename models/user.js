const { Model, DataTypes }  = require('sequelize');
const bcrypt                = require('bcrypt');
const totp                  = require('totp-generator');
const crypto                = require('crypto');

class User extends Model {

    /**
     * @returns number[]|false
     */
    async getTotpCodes() {
        if (this.totp && this.totpRec) {
            /** @type number[] */
            let codes = this.totpRec.split(',').map(x => {return parseInt(x, 10);});
            const period = (30 * 1000)

            codes.push(parseInt(totp(this.totp, { timestamp: Date.now() - period})));
            codes.push(parseInt(totp(this.totp)));
            codes.push(parseInt(totp(this.totp, { timestamp: Date.now() + period})));
            console.log(codes);
            return codes;
        }
        return false;
    }

    /**
     * 
     * @param {number} code 
     * @returns bool
     */
    async checkTotp(code) {
        const codes = await this.getTotpCodes();
        return codes.indexOf(code) !== 1;
    }

    /**
     * @param {{login: string, pass: string, totp?: string}} data
     * @return {User}
     */
    static async authenticate(data) {
        const rows = await User.findAndCountAll({where: {
            login: data.login
        }});
        if (rows.count == 0) return false;

        /** @type User */
        const this_ = rows.rows[0];

        if (!(await bcrypt.compare(data.pass, this_.pass))) {
            return false;
        }

        if (this_.totp) {
            if (!data.totp)                     return false;
            if (!this_.checkTotp(data.totp))    return false;
        }

        return rows.rows[0];
    }

    async createSession() {
        let session = {};
        session.user_id = this.id;
        session.login = this.login;
        session.expires = Date.now() + (60 * 60 * 1000);
        session.secret = crypto.randomBytes(256).toString('base64');
        return session;
    }
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