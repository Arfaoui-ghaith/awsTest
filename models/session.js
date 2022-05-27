'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Session extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Session.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Session.belongsTo(models.Employee, {
                foreignKey: 'startedBy',
                onDelete: 'CASCADE'
            })
            Session.belongsTo(models.Employee, {
                foreignKey: 'endedBy',
                onDelete: 'CASCADE'
            })
            Session.hasMany(models.Bill, {
                foreignKey: 'SessionId',
                onDelete: 'CASCADE'
            })
            Session.hasMany(models.Bill_Item, {
                foreignKey: 'sessionId',
                onDelete: 'CASCADE'
            })
        }
    }
    Session.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        date: DataTypes.DATE,
        startCash: DataTypes.FLOAT,
        endedBy: DataTypes.UUID,
        startedBy: DataTypes.UUID,
        endCash: DataTypes.FLOAT,
        endedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Session',
    });
    return Session;
};
