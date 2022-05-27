'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SellingItemsLog extends Model {
        static associate(models) {
            SellingItemsLog.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            SellingItemsLog.belongsTo(models.MenuItem, {
                foreignKey: 'MenuItemId',
                onDelete: 'CASCADE'
            })
        }
    }
    SellingItemsLog.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        totalPrice: DataTypes.FLOAT,
        quantity: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'SellingItemsLog',
    });
    return SellingItemsLog;
};
