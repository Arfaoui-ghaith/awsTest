'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Stock extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Stock.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            })
            Stock.belongsTo(models.Store, {
                foreignKey: 'StoreId',
                onDelete: 'CASCADE'
            })
        }
    }
    Stock.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        materialName: DataTypes.STRING,
        currentStock: DataTypes.REAL,
        units: DataTypes.STRING,
        price: DataTypes.FLOAT,
        MaterialId: DataTypes.UUID,
        StoreId: DataTypes.UUID,
        ShopId: DataTypes.UUID,
    }, {
        sequelize,
        modelName: 'Stock',
    });
    return Stock;
};
