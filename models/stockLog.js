'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StockLog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            StockLog.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            StockLog.belongsTo(models.Stock, {
                foreignKey: 'StockId',
                onDelete: 'CASCADE'
            })
        }
    }
    StockLog.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        date: DataTypes.DATE,
        existingStock: DataTypes.FLOAT,
        updatedStock: DataTypes.FLOAT,
        stockChangeQuantity:  DataTypes.REAL,
        price: DataTypes.FLOAT,
        notes: DataTypes.STRING,
        type: DataTypes.STRING, // ['STOCK_MOVE_IN', 'STOCK_MOVE_OUT', 'STOCK_PURCHASED', 'STOCK_ADJUSTED', 'STOCK_BILLED']
        EmployeeId: DataTypes.UUID,
        highPrice: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'StockLog',
    });
    return StockLog;
};
