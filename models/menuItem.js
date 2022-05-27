'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MenuItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MenuItem.belongsTo(models.MenuItemCategory, {
                foreignKey: 'MenuItemCategoryId',
                onDelete: 'CASCADE'
            });
            MenuItem.belongsTo(models.Shop, {
                foreignKey: 'ShopId',
                onDelete: 'CASCADE'
            });
            MenuItem.belongsTo(models.Printer, {
                foreignKey: 'PrinterId',
                onDelete: 'CASCADE'
            });
        }
    }
    MenuItem.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        arabicName: DataTypes.STRING,
        description: DataTypes.STRING,
        arabicDescription: DataTypes.STRING,
        image: DataTypes.STRING,
        materials: DataTypes.JSONB,
        variants: DataTypes.JSONB,
        sellingPrice: DataTypes.FLOAT,
        isFavorite: DataTypes.BOOLEAN,
        PrinterId: DataTypes.UUID,
        PrinterName: DataTypes.STRING,
        barCode: DataTypes.STRING,
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        isDeletable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        employeeId: DataTypes.UUID,
        MenuItemCategoryId: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'MenuItem',
    });
    return MenuItem;
};
