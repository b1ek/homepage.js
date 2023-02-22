const { Model } = require('sequelize');

class Article extends Model {
    
}

let init = (sequelize, DataTypes) => {
    let article = Article.init({
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
        },
        gpgsign: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Article',
        tableName: 'articles'
    })
    article.class = Article;

    return article;
}

init.class = Article;
module.exports = init;